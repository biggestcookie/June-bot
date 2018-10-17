module.exports = {
    run: client => {
        client.user.setActivity("for an @mention", { type: 3 });
        console.log("Bot running.");
    }
};
