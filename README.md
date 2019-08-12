[![CircleCI](https://circleci.com/gh/andela/AndelaEatsUI/tree/develop.svg?style=svg)](https://circleci.com/gh/andela/AndelaEatsUI/tree/develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7612d96cf534e4d616bf/maintainability)](https://codeclimate.com/github/andela/AndelaEatsUI/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/andela/AndelaEatsUI/badge.svg?branch=develop)](https://coveralls.io/github/andela/AndelaEatsUI?branch=develop)
# Andela Eats
The Andela Eats client side implementation

# Description
The Andela Eats is the software automation of the current feeding system so as to make it scalable through enabling access to all Andelans without Andela having to incur extra cost. The solution will also serve as a central place where all meal information is stored both for Andelans and vendors. Vendors can manage meals and view feedback. Andelans can conveniently pre-order meals without the fear that a particular favorite meal is finished.


## Technology Stack
 + React: `A JavaScript library for building user interface`
 + Redux: `A predictable state container for JavaScript apps`
 + Node: `An open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.`
 + Yarn: `A package manager for JavaScript`

### Getting Started
Here is how to get a copy of the project up and running on your local machine for development and testing purposes.

# Installation

### Prerequisites
* You will need to have npm, the best way to install npm is to install node using the [node.js installer](https://nodejs.org/en/download/), npm is installed as part of node.

* Clone this repository by running the command
`git clone https://github.com/andela/AndelaEatsUI.git`

* After successfully cloning the project:
`cd AndelaEatsUI/client`

* To Install dependencies.
`yarn install`

* You will require to create an alias for andelaeats-dev.andela.com in your /etc/hosts which you can access by running this command
  ```sudo vim /etc/hosts``` which opens your /etc/hosts for editing using vim.
  To edit it, get into insert mode by pressing ```i``` key and put these
   ```127.0.0.1       andelaeats-dev.andela.com``` after the last line.

*  Setup your .env variables (ask the other team members for the keys). An example is available in the env.example file.

### Starting the app
* To start the app locally run the following commands
`yarn build && yarn dev`

## Testing
* For Component test
`yarn test`

## Contributions

* Contributors should adhere to the guidelines in the:
* [Andela Eats](https://github.com/andela/AndelaEatsUI/wiki/AndelaEats-Conventions)
