module.exports = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <title></title>
            <link href="https://fonts.googleapis.com/css2?family=Kalam&family=Zhi+Mang+Xing&display=swap" rel="stylesheet"> 
            <style>
                .zhi {
                    font-family: 'Zhi Mang Xing', cursive;
                }
                .en {
                    font-family: 'Kalam', cursive;
                }
                .main-page {
                    font-size: 52px;
                    text-align: center;
                    width: 100%;
                    height: 100%;
                    padding-top: 150px;
                }
                p {
                    margin: 20px;
                }
            </style>
        </head>
        <body>
            <div class="main-page">
                <p class='en'>zhihu-bg</p>
                <p class='zhi'>基于<span class='en'>NodeJS</span>和<span class='en'>KOA2</span></p>
            </div>
        </body>
    </html>
`;
