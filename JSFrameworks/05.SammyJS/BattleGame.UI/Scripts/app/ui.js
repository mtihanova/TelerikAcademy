﻿define(function () {
    var ui = (function () {
        var myNickname;
        var persister;

        function buildGameUI(persister) {
            myNickname = persister.nickname();
            this.persister = persister;

            var uiHTML = '<span id="user-nickname">' +
                        myNickname +
                    '</span>' +
                    '<button id="btn-logout">Logout</button>' +
                    '<br/>Title: <input type="text" id="tb-create-title" />' +
                    'Password: <input type="text" id="tb-create-password" />' +
                    '<button id="btn-create-game">Create</button>' +
                    '<h2>Open</h2>' +
                    '<div id="open-games-container"></div>' +
                    '<h2>Active</h2>' +
                    '<div id="active-games-container"></div>';
            uiHTML += '<div id="messagesWrapper">' +
            '<button id="btn-all-messages">Get All</button> <-(Try refreshing the page if messages dont appear<br/>' +
            'Unread messages appear after user clicks on a game in progress)' +
            '<p>Messages:</p>' +
            '<div id="messages">' +
            '</div>' +
            '</div>';
            return uiHTML;
        }

        function buildOpenGamesList(games) {
            var list = "<ul>";

            for (var i = 0; i < games.length; i++) {
                var game = games[i];
                list += '<li data-game-id="' + game.id + '">' +
                    '<a href="#">' +
                        $("<div />").html(game.title).text() +
                    '</a>' + " -> " + game.creator + '</li>';
            }
            list += "</ul>";
            return list;
        }

        function buildActiveGamesList(games) {
            var list = "<ul>";

            for (var i = 0; i < games.length; i++) {
                var game = games[i];
                list += '<li data-game-id="' + game.id + '" data-game-status="' + game.status + '"><a href="#">'
                    + game.title + '</a>' + " -> id - " +
                    game.id + " status - " + game.status +
                    ', creator - ' + game.creator;

                if (game.creator == myNickname && game.status == "full") {
                    list += '<button id="btn-start-game">Start</button>';
                }



                list += '</li>';
            }
            list += "</ul>";
            return list;
        }

        function buildUserScore(scores) {
            var show = ' <a href="#">Scores</a><div id="all-scores"><ul>';
            for (var i = 0; i < scores.length; i++) {
                show += '<li>' + scores[i].nickname + " - " + scores[i].score + '</li>';
            }

            show += '</ul></div>';

            $('#user-nickname').append(show);
            $("#all-scores").hide();
        }

        function buildField(data) {
            var table = "<table>";
            for (var i = 0; i < 9; i++) {
                table += '<tr>'
                for (var j = 0; j < 9; j++) {
                    var unitExists = false;
                    for (var k = 0; k < 9; k++) {
                        if (k < data.red.units.length && data.red.units[k].position.x == j && data.red.units[k].position.y == i) {
                            table += '<td data-y="' + i + '" data-x="' + j + '" style="background-color: red">';

                            if (data.red.units[k].type == "warrior") {
                                table += "Warrior" + "<br/>";
                            } else {
                                table += "Ranger" + "<br/>";
                            }
                            table += "Armor: " + data.red.units[k].armor + "<br/>";
                            table += "Attack: " + data.red.units[k].attack + "<br/>";
                            table += "HitPoints: " + data.red.units[k].hitPoints + "<br/>";
                            table += "Mode: " + data.red.units[k].mode + "<br/>";
                            table += "Range: " + data.red.units[k].range + "<br/>";
                            table += "Speed: " + data.red.units[k].speed + "<br/>";
                            table += "ID: " + data.red.units[k].id + "<br/>";

                            unitExists = true;
                            table += "</td>";
                            break;
                        }
                        else if (k < data.blue.units.length && data.blue.units[k].position.x == j && data.blue.units[k].position.y == i) {
                            table += '<td data-y="' + i + '" data-x="' + j + '" style="background-color: aqua">';

                            if (data.blue.units[k].type == "warrior") {
                                table += "Warrior" + "<br/>";
                            } else {
                                table += "Ranger" + "<br/>";
                            }
                            table += "Armor: " + data.blue.units[k].armor + "<br/>";
                            table += "Attack: " + data.blue.units[k].attack + "<br/>";
                            table += "HitPoints: " + data.blue.units[k].hitPoints + "<br/>";
                            table += "Mode: " + data.blue.units[k].mode + "<br/>";
                            table += "Range: " + data.blue.units[k].range + "<br/>";
                            table += "Speed: " + data.blue.units[k].speed + "<br/>";
                            table += "ID: " + data.blue.units[k].id + "<br/>";
                            unitExists = true;
                            table += "</td>";
                            break;
                        }


                    }
                    if (!unitExists) {

                        table += '<td data-y="' + i + '" data-x="' + j + '" style="width:110px; height:122px;"> - ' + i + " " + j + " -</td>";

                    }
                }

            }




            return table;
        }

        return {
            gameUI: buildGameUI,
            openGamesList: buildOpenGamesList,
            activeGamesList: buildActiveGamesList,
            userScore: buildUserScore,
            buildField: buildField,
        }
    }());

    return ui;
});