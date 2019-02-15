module.exports = {
    run: client => {
        client.user.setActivity("for a @mention", { type: 3 });
        console.log("Bot running.");
    }
};
