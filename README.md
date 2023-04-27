# Transcendence

AWS addr : `localhost`
DB port  : `5432`  
BE port  : `3000`  
FE port  : `4242`  
Oauth redirection : `localhost:3000/logincheck`

```
파일 구조
.
├── Makefile
├── README.md
├── docker-compose.yml
├── envs
│   ├── .backendenv
│   ├── .databaseenv
│   └── .frontenv
└── src
    ├── backend
    │   ├── Dockerfile
    │   ├── conf
    │   │   └── sshd_config
    │   └── tools
    │       └── entrypoint.sh
    ├── frontend
    │   ├── Dockerfile
    │   ├── conf
    │   │   ├── default
    │   │   └── sshd_config
    │   └── tools
    │       └── entrypoint.sh
    └── vol
        ├── {BACKEND REPOSITORY}
        └── {BACKEND REPOSITORY}
```