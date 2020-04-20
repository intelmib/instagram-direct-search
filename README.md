# Buscar palavras/frases em conversas do Instagram

Olá, eu fiz essa extensão porque não achei nada do tipo e também eu gostaria de aprender a fazer extensão para o Chrome.
> Ah, eu só testei no Chrome, mas acredito que mudando o manifest.json seja possível executar em outros navegadores.


Indo direto ao ponto: A extensão só atua no direct do Instagram, apenas desktop, ela lista todas as conversas e abre uma por uma recolhendo as mensagens; No final ela cria um ou mais arquivos com extensão CSV contendo o username e data do envio da mensagem(o instagram não coloca de maneira clara a data/hora, provavelmente não vai ser possível ver hora:minutos:segundos, apenas hora:minuto do envio da mensagem).


## Como executar?

Baixa todos os arquivos com um:
> git clone https://github.com/xmatheus/instagram-searchInChats

Abra o Google Chrome e digite:
> chrome://extensions

Habilite a opção de desenvolvedor(eu ainda não coloquei na loja do navegador, sorry):

![Screen Capture_select-area_20200420135254](https://user-images.githubusercontent.com/34286800/79783213-4e9e4f00-830e-11ea-887c-53c6b6590d79.png)

E então arraste a pasta na janela do navegador.

### Você já deve ver algo assim:

![Screen Capture_select-area_20200420135525](https://user-images.githubusercontent.com/34286800/79783408-9cb35280-830e-11ea-88a1-ab744f742ca0.png)

Caso não, tente fechar e abrir o navegador. Se mesmo assim não rodar, volte na página ***chrome://extensions*** e verifique se tem alguma caixa de erro.

## Vídeo da extensão sendo executada

[https://www.youtube.com/watch?v=SoI3Nl_hnLs](https://www.youtube.com/watch?v=SoI3Nl_hnLs)
