# Data Analysis Agent

### Utterances to test

##### Requirement 1 [Unique words] -
- how many unique words are present in the file
- unique words present in the file
- unique words in the file
- unique words

##### Requirement 2 [Count of a word] -
- what is the count of the word {word}
- count of the word {word}
- count of {word}

##### Requirement 3 [count of a word & its synonyms] -
- find the count of the words that mean {word}
- count of the words that mean {word}
- count of the words meaning {word}

##### Requirement 4 [Top words by occurrence] -
- which are the top {range} words by occurrence
- what are the top {range} words by occurrence
- top {range} words by occurrence

### Prerequisites
- Node Js (preferably v16.x.x)
- Chrome Web Browser
- Active Internet Connection

### Steps to run the project

##### Run UI (frontend)

Navigate to the ***/ui*** directory of this project & execute the below commands to install the dependencies and start the UI server.

```sh
npm install -g http-server --save
```
```sh
http-server -c-1
```
Please make sure that your console shows logs that your UI server has started on port (8080), else resolve the start-up errors.

##### Run API (backend)

Navigate to the ***/api*** directory of this project & execute the below commands to install the dependencies and start the API server.

```sh
npm install
```
```sh
npm run start
```
When the UI & API servers have started, please visit http://localhost:8080 and use the above suggested utterances in the chat interface (after replacing slots placeholders with appropriate values)

**-- Authored by 'Krushil Goud'**