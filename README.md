
# Golden Raspberry Awards Analyzer

## Description
This is a Node.js application with NestJS framework that analyzes the nominees and winners of an awards based on a CSV file and identifies which nominees have won multiple times with the shortest and longest time intervals. It also uses the in-memory database LokiJS for data storage.


## Requirments
- NodeJS

## Installation
To run the application, follow the steps below:

1. Update the dependencies by running the following command:
```
npm install
```

2. Compile the application with the command:
```
npm run build
```

3. Start the server with the command:
```
npm run start
```

The application will be available at `http://localhost:3000/`.

## Usage
To use the application, access the main endpoint in your browser or through a tool such as Postman.


## Features
- Identify which award nominees have won multiple times with the shortest and longest time intervals.

### API Call Example
Access the endpoint where the application is running by making a `GET` request:

```http
GET http://localhost:3000/
```

### API Response
The response from this endpoint will follow the format below:

```
{
    "min": [
        {
            "producer": "Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper",
            "interval": 2,
            "previousWin": 2019,
            "followingWin": 2021
        }
    ],
    "max": [
        {
            "producer": "Bo Derek",
            "interval": 6,
            "previousWin": 1984,
            "followingWin": 1990
        }
    ]
}
```

### Optional Parameters
Optionally, this endpoint accepts query parameters to specify the range of years to perform the awards search.
The parameters are `startYear` and `endYear`. The request would look like the following:

```http
GET localhost:3000?startYear=1980&endYear=2010
```

## Testing
To execute e2e tests, run the following command:
```
npm run test
```

---

# Golden Raspberry Awards Analyzer

## Descrição
Este é um aplicativo Node.js com o framework NestJS que analisa os indicados e vencedores do Golden Raspberry Awards e identifica quais indicados venceram mais de uma vez no menor e maior intervalo de tempo.

## Requisitos
- NodeJS

## Instalação
Para executar a aplicação, siga as etapas abaixo:

1. Atualize as dependências executando o comando:
```
npm install
```

2. Compile o aplicativo com o comando:
```
npm run build
```

3. Inicie o servidor com o comando:
```
npm run start
```

A aplicação estará disponível no endereço `http://localhost:3000/`.

## Uso
Para usar a aplicação, acesse o endpoint principal no navegador, ou em ferramentas como Postman.

## Funcionalidades
- Identificar quais indicados ao prêmio venceram mais de uma vez no menor e maior intervalo de tempo.

### Exemplo de Chamada da API
Acesse o endpoint em que a aplicação está rodando, através de uma chamada `GET`:

```http
GET http://localhost:3000/
```

### Retorno da API
O retorno desse endpoint seguirá o seguinte formato:

```
{
    "min": [
        {
            "producer": "Debra Hayward, Tim Bevan, Eric Fellner, and Tom Hooper",
            "interval": 2,
            "previousWin": 2019,
            "followingWin": 2021
        }
    ],
    "max": [
        {
            "producer": "Bo Derek",
            "interval": 6,
            "previousWin": 1984,
            "followingWin": 1990
        }
    ]
}
```

### Parâmetros Opcionais
Opcionalmente, este endpoint aceita parâmetros na query para especificar o intervalo de anos da pesquisa de premiações. Os parâmetros são `startYear` e `endYear`. A requisição ficaria da seguinte forma:

```http
GET localhost:3000?startYear=1980&endYear=2010
```

## Testes
Para rodar testes e2e, execute o seguinte comando:
```
npm run test
```