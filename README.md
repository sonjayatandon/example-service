# example-service
Reference project for a typically node/express/mongo service

To get started ....

#Build the docker images
In the project directory
```
> docker-compose build
```

# Spin up the services
```
> docker-compose up -d
```

Check the logs via
```
> docker-compose logs
```

or to check logs for a single service

```
> docker-compose logs [service name]  # e.g. docker-compose logs products-service
```

# Try it out
You can view and interact directly with the products-service api via this link:
http://127.0.0.1:5000/docs/

