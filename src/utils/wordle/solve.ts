import config from "../../config.json";
import { randomElement } from "../random";
import answers from "./answers.json";

enum Placement {
  UNUSED,
  WRONGSPOT,
  CORRECT,
}

type LetterPlacement = [letter: string, placement: Placement];

interface GuessProgress {
  previousGuesses: Set<string>;
  badLetters: Set<string>;
  unknownLetterIndices: Map<string, Set<number>>;
  knownLetters: Array<string | null>;
}

interface GuessCorrectness {
  isCorrect: boolean;
  letterPlacements: LetterPlacement[];
}

export function solveWordle(): string {
  const answer = getAnswer();
  let solved = false;

  const guessEmojis: string[] = [];

  let attempts = 0;
  let guessProgress: GuessProgress = {
    previousGuesses: new Set(),
    badLetters: new Set(),
    unknownLetterIndices: new Map(),
    knownLetters: new Array(5).fill(null),
  };

  while (attempts < 6 && !solved) {
    const guessedWord = createGuess(guessProgress);
    const correctness = guessCorrectness(guessedWord, answer);

    let emojiLine = correctness.letterPlacements.reduce(
      (acc, guessPlacement) => {
        let emoji: string;

        switch (guessPlacement[1]) {
          case Placement.CORRECT:
            emoji = ":green_square:";
            break;
          case Placement.WRONGSPOT:
            emoji = ":yellow_square:";
            break;
          default:
            emoji = ":black_large_square:";
            break;
        }

        return acc.concat(emoji);
      },
      ""
    );

    emojiLine += `        ||${guessedWord}||`;
    guessEmojis.push(emojiLine);

    solved = correctness.isCorrect;

    if (!solved) {
      guessProgress = updateGuessProgress(
        guessProgress,
        guessedWord,
        correctness
      );
    }

    attempts++;
  }
  const message = `Wordle ${getWordleCount()} ${guessEmojis.length}/6\n\n`;
  return message.concat(
    guessEmojis.join("\n"),
    `\n\n${randomElement(config.text.wordle[attempts - 1])}`
  );
}

function updateGuessProgress(
  guessProgress: GuessProgress,
  guessedWord: string,
  correctness: GuessCorrectness
) {
  guessProgress.previousGuesses.add(guessedWord);
  for (const [
    index,
    [letter, placement],
  ] of correctness.letterPlacements.entries()) {
    switch (placement) {
      case Placement.UNUSED: {
        guessProgress.badLetters.add(letter);
        break;
      }
      case Placement.WRONGSPOT: {
        const indices = guessProgress.unknownLetterIndices.get(letter);

        guessProgress.unknownLetterIndices.set(
          letter,
          indices?.add(index) ?? new Set([index])
        );
        break;
      }
      default: {
        guessProgress.knownLetters[index] = letter;
        break;
      }
    }
  }

  return guessProgress;
}

function createGuess(guessProgress: GuessProgress): string {
  const { previousGuesses, unknownLetterIndices, badLetters, knownLetters } =
    guessProgress;

  if (previousGuesses.size < 1) {
    return randomElement(answers);
  }

  // Add positive lookaheads for each character in wrong spot, to ensure it appears in the answer at least once
  let searchRegexString =
    [...unknownLetterIndices.keys()].reduce(
      (acc, unknownLetter) => (acc += `(?=\\w*${unknownLetter})`),
      ""
    ) + "^";

  for (let index = 0; index < 5; index++) {
    if (knownLetters[index]) {
      searchRegexString += knownLetters[index];
    } else {
      // Add letters to allow in search, removing all excluded letters
      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      let letterRange = "[";

      for (const letter of alphabet) {
        const unknownLetterIndex = unknownLetterIndices.get(letter);
        if (
          !badLetters.has(letter) &&
          (!unknownLetterIndex || !unknownLetterIndex.has(index))
        ) {
          letterRange += letter;
        }
      }

      searchRegexString += letterRange + "]";
    }
  }

  const matches = answers.filter(
    (answer) =>
      !previousGuesses.has(answer) && new RegExp(searchRegexString).test(answer)
  )!;

  return randomElement(matches);
}

function guessCorrectness(
  guessedWord: string,
  answer: string
): GuessCorrectness {
  let isCorrect = true;

  const guessPlacements: LetterPlacement[] = guessedWord
    .split("")
    .map((guessChar, index) => {
      const answerChar = answer[index];

      if (guessChar === answerChar) {
        return [guessChar, Placement.CORRECT];
      } else if (answer.includes(guessChar)) {
        isCorrect = false;
        return [guessChar, Placement.WRONGSPOT];
      } else {
        isCorrect = false;
        return [guessChar, Placement.UNUSED];
      }
    });

  return {
    isCorrect,
    letterPlacements: guessPlacements,
  };
}

function getAnswer(date?: Date): string {
  return answers[getWordleCount(date)];
}

function getWordleCount(date?: Date): number {
  const milliSecondsToDay = 864e5;
  const startDate = new Date(2021, 5, 19);
  const endDate = date ?? new Date();

  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / milliSecondsToDay
  );
}
