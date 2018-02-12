# react-cryptocurrency
A simple application to track your benefits

## FIRST STEPS

### INSTALLATION

Steps:
- `npm install -g yarn neutrino nodemon`
- `npm install` on both directories (/client and /server)

### BUILD & RUN

##### CLIENT

Steps:
- `yarn build` to build project
- `yarn start` to launch project

##### SERVER

Steps:
- `nodemon index.js`

## FAQ: FREQUENTLY ANSWER & QUESTIONS

- Nodemon is not found, although is on the package.json
    - Maybe, it should be needed to install it globally  `npm install -g nodemon`
- Using a mongo docker image, I cannot connect with the database. Why?
    - A possible solution could be to update the server/main.js file with: 
        - `'database': 'container-mongo-name://localhost:27017'` 
    - and run 
        - `docker run --name critpo-mongo -p 27017:27017 -v /host-directory:/data/db -d mongo mongod`

## ToDO / ENHANCEMENTS

### COMMON

- [ ] Adding a criptocurrency flow

### CLIENT

- [ ] Styles

#### LOGIN
- [ ] Error control
    - [ ] Adding timeout for the database connection fails    

####  

### SERVER

