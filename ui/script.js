var userMessage;
var agentMessage;
var request;
var response;

const intents = [{
        name: 'uniqueWordsIntent',
        values: [
            'how many unique words are present in the file',
            'unique words present in the file',
            'unique words in the file',
            'unique words',
        ]
    },
    {
        name: 'wordSynonymCountIntent',
        values: [
            'find the count of the words that mean {word}',
            'count of the words that mean {word}',
            'count of the words meaning {word}',
        ]
    },
    {
        name: 'wordCountIntent',
        values: [
            'what is the count of the word {word}',
            'count of the word {word}',
            'count of {word}',
        ]
    },
    {
        name: 'wordRankIntent',
        values: [
            'which are the top {range} words by occurrence',
            'what are the top {range} words by occurrence',
            'top {range} words by occurrence',
        ]
    }
];

const urls = {
    uniqueWordsIntent: 'http://localhost:3000/v1/data-analysis/unique-words',
    wordCountIntent: 'http://localhost:3000/v1/data-analysis/word/{word}/count',
    wordSynonymCountIntent: 'http://localhost:3000/v1/data-analysis/synonyms/{word}/count',
    wordRankIntent: 'http://localhost:3000/v1/data-analysis/words/rank/{range}'
}

const agentMessages = {
    uniqueWordsIntent: 'The total number of unique words is {count}.',
    wordCountIntent: 'This word occurred {count} times.',
    wordSynonymCountIntent: 'This word, along with its synonyms, occurred {count} times.',
    wordRankIntent: 'Here you go. I have a graphical representation of the data for you.'
}

$(function() {
    $(".heading-compose").click(function() {
        $(".side-two").css({
            "left": "0"
        });
    });

    $(".newMessage-back").click(function() {
        $(".side-two").css({
            "left": "-100%"
        });
    });
})

function send() {
    let userMessage = document.getElementById("message").value.trim();
    if (userMessage) {
        userMessage = userMessage.toLowerCase();
        document.getElementById("message").value = "";
        document.getElementById("userMessage").innerHTML = userMessage;
        document.getElementById("agentMessage").innerHTML = "typing...";
        let resolvedIntent;
        let slots = {};
        intents.forEach(intent => {
            intent.values.forEach(value => {
                const term = value.split(`{${getSlot(value)}}`)[0].trim();
                if (userMessage.includes(term)) {
                    resolvedIntent = intent;
                    userMessage = userMessage.replace(term, '').trim().split(' ')[0];
                    slots[getSlot(value)] = userMessage.trim();
                }
            })
        });
        if (resolvedIntent && resolvedIntent.name) {
            call(resolvedIntent, slots);
        } else {
            document.getElementById("agentMessage").innerHTML = "I didn't get that. Please try re-phrasing your words.";
        }
    }
}

function call(intent, slots) {
    let url = urls[intent.name];
    if (intent.name === 'wordCountIntent' || intent.name === 'wordSynonymCountIntent') {
        url = urls[intent.name].replace('{word}', slots.word);
    } else if (intent.name === 'wordRankIntent') {
        url = urls[intent.name].replace('{range}', slots.range);
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            document.getElementById("agentMessage").innerHTML = agentMessages[intent.name].replace('{count}', response.data.count);
            if (intent.name === 'wordRankIntent') {
                document.getElementById("agentMessage").innerHTML = '<canvas id="myChart" style="width:100%;max-width:600px"></canvas>';
                var xValues = Object.keys(response.data);
                var yValues = Object.values(response.data);
                var barColors = [];
                xValues.forEach(() => barColors.push(randomColor()));
                new Chart("myChart", {
                    type: "pie",
                    data: {
                        labels: xValues,
                        datasets: [{
                            backgroundColor: barColors,
                            data: yValues
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: `Top ${xValues.length} words by occurrence`
                        }
                    }
                });
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

const getSlot = (str) => {
    return str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'));
}

const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}