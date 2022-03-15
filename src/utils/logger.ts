export function log(message: string, username?: string) {
  console.log(
    `${new Date().toLocaleString()} - ${
      username ? username + " " : ""
    }${message}`
  );
}

export function logError(error: any) {
  console.error(`${new Date().toLocaleString()} - Error`, error);
}
