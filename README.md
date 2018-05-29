Run steps

1. Installed nodejs, mongodb and mongodb is running
2. `npm install` or `yarn install`
3. Start API server `node index.js` or `PORT=xxxx node index.js`
4. Create new user
    - endpoint: `http://localhost:8899/user` (if running with another port please replace 8899 by your port)
    - method: POST
    - data: JSON (username, password, answers fields is required), following is example of POST data

        `{
            "firstName": "John",
            "lastName": "smith",
            "email": "js@js.com",
            "username": "admin",
            "password": "admin123",
            "answers": [{"type": "saving", "choice": 10000}, {"type": "loaning", "choice": 8000}]
        }`

    - response: JSON following is example of response

        `{
            "error": null,
            "data": {
                "_id": "5b0d21514c55b31dba35bd57",
                "firstName": "John",
                "lastName": "smith",
                "email": "js@js.com",
                "username": "admin",
                "password": "$2b$10$hoE/RATAUYQEwokppJnd/.47mXriMA6WMMBGCGhc36vGX1VV2FZ8q",
                "rank": "B",
                "created": "2018-05-29T09:45:53.508Z",
                "__v": 0
            }
        }`
5. Enjoy
6. Notes: Tested on Archlinux with nodejs 10.2.1, mongodb 3.6.4
