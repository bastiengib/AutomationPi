# AutomotionPi

## Lancer le serveur via node
```bash
su pi -c 'node /path/to/app/index.js > /path/to/logfile/log &'
```

## IFTTT config
Object à exporter : `{ "base": <URL>", "key": "/with/key/<KEY>"};`se référer à la doc de IFTTT WebHook

## DB config Postgres
Object à exporter : `"postgres://login:password@IP:port/database";`

## Computer config
Object à exporter : `{ "base": <URL>", "key": "/with/key/<KEY>"};`se référer à la doc de IFTTT WebHook

## Pushbullet config
Object à exporter : `{ "base": <URL>", "key": "/with/key/<KEY>"};`se référer à la doc de IFTTT WebHook