class Song{
    constructor(nome){
        this.nome = nome;
        this.simpleName = simplificaNome(nome,true);
        this.sigla = sigla(simplificaNome(nome,false));
        this.on = false;
    }
    table(){
        this.element = document.createElement("div");
        this.element.setAttribute("class","td");
        this.element.innerHTML = `
        <p style="color:rgba(0,0,0,0);">${this.nome}</p>
        `;
        return this.element;

    }
    ativa(cor){
        if(cor == "white"){
            this.on = true;
        }
        this.element.querySelector("p").style.color = cor;
    }
}
class Album{
    constructor(id,nome,artista,foto,songs){
        this.id = id;
        this.nome = nome;
        this.artista = artista;
        this.foto = foto;
        this.songs = songs;
        this.on = true;
    }
    table(){
        var div = document.createElement("div");
        div.setAttribute("class","tabela");
        var th = document.createElement("div");
        th.setAttribute("class","th td");
        th.innerHTML = `
            <p>${this.nome}</p>
        `;
        div.appendChild(th)
        for(var song of this.songs){
            div.appendChild(song.table());
        }        
        return div;
    }
    opcao(){
        this.element = document.createElement("div");
        this.element.setAttribute("onclick",`ativaAlbum("${this.id}")`);
        if(this.on){
            this.element.setAttribute("class","album on");
        }
        else{
            this.element.setAttribute("class","album off");
        }
        this.element.innerHTML = `
        <img src="${this.foto}" alt="${this.nome}">
        <p class="nome">${this.nome}</p>
        `;
        return this.element;
    }
    ativa(){
        this.on = !this.on;
        if(this.on){
            this.element.setAttribute("class","album on");
        }
        else{
            this.element.setAttribute("class","album off");
        }
    }
}
function ativaAlbum(id){
    for(var album of albuns){
        if(album.id == id){
            album.ativa();
        }
    }
}
class Playlist{
    constructor(id,nome,foto,songs){
        this.id = id
        this.nome = nome;
        this.foto = foto;
        this.songs = songs;
        this.on = true
    }
    table(){
        var div = document.createElement("div");
        div.setAttribute("class","tabela");
        var th = document.createElement("div");
        th.setAttribute("class","th td");
        th.innerHTML = `
            <p>${this.nome}</p>
        `;
        div.appendChild(th)
        for(var song of this.songs){
            div.appendChild(song.table());
        }        
        return div;
    }
    opcao(){
        this.element = document.createElement("div");
        this.element.setAttribute("onclick",`ativaPlaylist("${this.id}")`);
        if(this.on){
            this.element.setAttribute("class","album on");
        }
        else{
            this.element.setAttribute("class","album off");
        }
        this.element.innerHTML = `
        <img src="${this.foto}" alt="${this.nome}">
        <p class="nome">${this.nome}</p>
        `;
        return this.element;
    }
    ativa(){
        this.on = !this.on;
        if(this.on){
            this.element.setAttribute("class","album on");
        }
        else{
            this.element.setAttribute("class","album off");
        }
    }
}
function ativaPlaylist(id){
    for(var playlist of playlists){
        if(playlist.id == id){
            playlist.ativa();
        }
    }
}
class Artista{
    constructor(id,nome,foto){
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.on = true;
    }
    opcao(){
        this.element = document.createElement("div");
        this.element.setAttribute("onclick",`ativaArtista("${this.id}")`);
        if(this.on){
            this.element.setAttribute("class","artista on");
        }
        else{
            this.element.setAttribute("class","artista off");
        }
        this.element.innerHTML = `
        <img src="${this.foto}" alt="${this.nome}">
        <p class="nome">${this.nome}</p>
        `;
        return this.element;
    }
    ativa(){
        this.on = !this.on;
        this.reiniciaAlbuns();
        menu();
        if(this.on){
            this.element.setAttribute("class","artista on");
        }
        else{
            this.element.setAttribute("class","artista off");
        }
    }
    reiniciaAlbuns(){
        for(var album of albuns){
            if(album.artista == this.nome){
                album.on = this.on;
                for(var song of album.songs){
                    song.on = false;
                }
            }
        }
    }
}
function ativaArtista(id){
    for(var artista of artistas){
        if(artista.id == id){
            artista.ativa();
        }
    }
}
class Dificuldade{
    constructor(nome,on){
        this.nome = nome;
        this.on = on;
    }
    opcao(){
        this.element = document.createElement("div");
        if(this.on){
            this.element.setAttribute("class","dificuldade on");
        }
        else{
            this.element.setAttribute("class","dificuldade off");
            this.element.setAttribute("onclick","ativaDificuldade('"+this.nome+"')");
        }
        this.element.innerHTML = `
        <p class="nome">${this.nome}</p>
        `;
        return this.element;
    }
    ativa(){
        this.on = true;
        this.element.setAttribute("class","dificuldade on");
        this.element.setAttribute("onclick","");
    }
    desativa(){
        this.on = false;
        this.element.setAttribute("class","dificuldade off");
        this.element.setAttribute("onclick","ativaDificuldade('"+this.nome+"')");
    }
}
function ativaDificuldade(nome){
    for(var dificuldade of dificuldades){
        if(dificuldade.nome == nome){
            dificuldade.ativa();
        }
        else{
            dificuldade.desativa();
        }
    }
}
function simplificaNome(nome,espaco){
    var nome = nome.toLowerCase().replaceAll(".", "").replaceAll("?", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("ê","e").replaceAll("ú","u").replaceAll(":","").replaceAll("ã","a").replaceAll("ó","o").replaceAll("á","a").replaceAll("/","").replaceAll("é","e");
    if(espaco){
        nome = nome.replaceAll(" ", "");
    }
    return nome;
}
function sigla(nome){
    var posicao = nome.indexOf(" ");
    var nome2 = nome.substring(posicao+1);
    posicao = nome2.indexOf(" ");
    if(posicao!=-1){
        var posicao = nome.indexOf(" ");
        var sigla = "";
        sigla += nome[0];
        do{
            sigla += nome[posicao+1];
            nome = nome.substring(posicao+1);
            posicao = nome.indexOf(" ");
        }while(posicao!=-1)
        return sigla;
    }
    else{
        return nome;
    }
}
function testaCondicoes(){
    var tof = false;
    for(var album of albuns){
        if(album.on){
            tof = true;
        }
    }
    if(!tof){
        var janela = document.createElement("div");
        janela.setAttribute("class","janela");
        janela.innerHTML = `
        <p>Nenhum álbum foi selecionado!</p>
        `;
        document.querySelector("main").appendChild(janela);
        setTimeout(()=>{
            janela.remove();
        },3000);
    }
    return tof;
}
function contaMusicas(){
    for(var album of albuns){
        if(album.on){
            songson += album.songs.length;
        }
    }
}
function pontuacao(){
    var p = document.querySelector(".pontuacao");
    p.innerHTML = `${songsok}/${songson}`;
}
function comecaTempo(){
    if(dificuldades[0].on){
        tempo = Math.round(songson*9/60)*60;
    }
    if(dificuldades[1].on){
        tempo = Math.round(songson*7/60)*60;
    }
    if(dificuldades[2].on){
        tempo = Math.round(songson*5/60)*60;
    }
    intervalo = setInterval(contaTempo,1000);
}
function contaTempo(){
    tempo--;
    p = document.querySelector(".contador");
    p.innerHTML = `${parseInt(tempo/60)<10 ? "0"+parseInt(tempo/60) : parseInt(tempo/60)}:${parseInt(tempo%60)<10 ? "0"+parseInt(tempo%60) : parseInt(tempo%60)}`;
    if(tempo == 0){
        finish();
    }
}
function pausar(){
    clearInterval(intervalo);
    document.querySelector(".input").disabled = true;
    document.querySelector(".input").value = "Jogo Pausado";
    document.querySelector(".input").style = "background-color:rgba(0,0,0,0);color:#81b71a;";
    document.querySelector(".pausar").innerHTML = "Continuar";
    document.querySelector(".pausar").setAttribute("onclick","voltar()");
    document.querySelector(".contador").style.color = "#81b71a";
}
function voltar(){
    intervalo = setInterval(contaTempo,1000);
    document.querySelector(".input").disabled = false;
    document.querySelector(".input").value = "";
    document.querySelector(".input").style = "";
    document.querySelector(".pausar").innerHTML = "Pausar";
    document.querySelector(".pausar").setAttribute("onclick","pausar()");
    document.querySelector(".contador").style.color = "white";
}
function finish(){
    clearInterval(intervalo);
    if(songsok == songson){
        var msg = "Parabéns! Você conseguiu lembrar de todas!"
    }
    else if(tempo == 0){
        var msg = "Seu tempo acabou!";
    }
    else{
        var msg = "Você desistiu!";
    }
    document.querySelector(".input").disabled = true;
    document.querySelector(".input").value = msg;
    document.querySelector(".input").style = "background-color:rgba(0,0,0,0);color:#81b71a;";
    document.querySelectorAll(".pausar")[0].innerHTML = "Jogar Novamente";
    document.querySelectorAll(".pausar")[1].innerHTML = "Menu";
    document.querySelectorAll(".pausar")[0].setAttribute("onclick","play()");
    document.querySelectorAll(".pausar")[1].setAttribute("onclick","menu()");
    document.querySelector(".contador").style.color = "#81b71a";
    for(var album of albuns){
        if(album.on){
            for(song of album.songs){
                if(!song.on){
                    song.ativa("black");
                }
            }
        }
    }
}
function testa(){
    var input = document.querySelector(".input");
    for(var album of albuns){
        if(album.on){
            for(song of album.songs){
                if((song.simpleName == simplificaNome(input.value,true) || (!dificuldades[2].on && song.sigla == simplificaNome(input.value,true))) && !song.on){
                    song.ativa("white");
                    songsok++;
                    pontuacao();
                    input.value = "";
                    if(songsok == songson){
                        finish();
                    }
                    break;
                }
            }
        }
    }
}
function menu(){
    var main = document.querySelector("main");
    main.innerHTML = "";
    var div = document.createElement("div");
    div.setAttribute("class","menu");
    var p = document.createElement("p");
    p.setAttribute("class","titulo");
    p.innerHTML = "Olá "+perfil.display_name+"!";
    div.appendChild(p);
    var p = document.createElement("p");
    p.setAttribute("class","titulo");
    p.innerHTML = "Artistas:";
    div.appendChild(p);
    divart = document.createElement("div");
    divart.setAttribute("class","artistas");
    for(var artista of artistas){
        divart.appendChild(artista.opcao());
    }
    div.appendChild(divart);
    var p = document.createElement("p");
    p.setAttribute("class","titulo");
    p.innerHTML = "Álbuns:";
    div.appendChild(p);
    divalb = document.createElement("div");
    divalb.setAttribute("class","albuns");
    for(var album of albuns){
        divalb.appendChild(album.opcao());
    }
    div.appendChild(divalb);
    var p = document.createElement("p");
    p.setAttribute("class","titulo");
    p.innerHTML = "Playlists:";
    div.appendChild(p);
    divalb = document.createElement("div");
    divalb.setAttribute("class","albuns");
    for(var playlist of playlists){
        divalb.appendChild(playlist.opcao());
    }
    div.appendChild(divalb);
    var divdif = document.createElement("div");
    divdif.setAttribute("class","dificuldades");
    var p = document.createElement("p");
    p.setAttribute("class","titulo");
    p.innerHTML = "Dificuldade:";
    div.appendChild(p);
    for(var dificuldade of dificuldades){
        divdif.appendChild(dificuldade.opcao());
    }
    div.appendChild(divdif);
    divjogar = document.createElement("div");
    divjogar.setAttribute("class","jogar");
    button = document.createElement("button");
    button.setAttribute("class","botaojogar");
    button.setAttribute("onclick","play()");
    button.innerHTML = "Jogar";
    divjogar.appendChild(button);
    div.appendChild(divjogar);
    main.appendChild(div);
}
function play(){
    if(testaCondicoes()){
        songson = 0;
        songsok = 0;
        var main = document.querySelector("main");
        main.innerHTML = "";
        var div = document.createElement("div");
        div.setAttribute("class","jogo");
        var controle = document.createElement("div");
        controle.setAttribute("class","controle");
        controle.innerHTML = `
        <input type="text" class="input" placeholder="Digite..." oninput="testa();" autofocus>
        <button class="pausar" onclick="pausar();">Pausar</button>
        <p class="pontuacao">0/0</p>
        <p class="contador">00:00</p>
        <button class="pausar" onclick="finish();">Desistir</button>
        `;
        div.appendChild(controle);
        var tabelas = document.createElement("div");
        tabelas.setAttribute("class","tabelas");
        for(album of albuns){
            if(album.on){
                tabelas.appendChild(album.table());
            }
        }
        div.appendChild(tabelas);
        main.appendChild(div);
        contaMusicas();
        pontuacao();
        comecaTempo();
    }
}
async function pegaCodigoSpotify(){
    try {
        token = document.location.hash.substring(document.location.hash.indexOf("access_token=")+13,document.location.hash.indexOf("&"));
        var json = await fetch("https://api.spotify.com/v1/me",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        perfil = await json.json();
        var json = await fetch("https://api.spotify.com/v1/me/playlists?limit=50",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        var playlistsjson = await json.json();
        console.log(playlistsjson);
        for(var i = 0; i<playlistsjson.items.length; i++){
            console.log(i);
            var json = await fetch("https://api.spotify.com/v1/playlists/"+playlistsjson.items[i].id,{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var playlist = await json.json();
            playlists.push(new Playlist(playlist.id,playlist.name,playlist.images[0].url,[]));
        }
        var json = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        var artistasjson = await json.json();
        artistasjson = artistasjson.artists;
        console.log(artistasjson);
        for(var i = 0; i<artistasjson.items.length; i++){
            console.log(i);
            artistas.push(new Artista(artistasjson.items[i].id,artistasjson.items[i].name,artistasjson.items[i].images[0].url));
            var json = await fetch("https://api.spotify.com/v1/artists/"+artistas[i].id+"/albums?include_groups=albums&limit=50",{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var albunsjson = await json.json();
            console.log(albunsjson);
        }
        var json = await fetch("https://api.spotify.com/v1/me/albums?limit=50",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        var albunsjson = await json.json();
        console.log(albunsjson);
        for(var i = 0; i<albunsjson.items.length; i++){
            console.log(i);
            var json = await fetch("https://api.spotify.com/v1/albums/"+albunsjson.items[i].album.id,{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var album = await json.json();
            console.log(album);
            albuns.push(new Album(album.id,album.name,album.artists[0].id,album.images[0].url,[]));
        }
    }catch(error){
        var carregando = document.querySelector(".carregando p");
        carregando.innerHTML = `Ocorreu um erro!`;
    }
    menu();
}
function carregando(){
    var div = document.createElement("div");
    div.setAttribute("class","carregando");
    div.innerHTML = `
        <p>Carregando...</p>
    `;
    document.querySelector("main").appendChild(div);
}
var artistas = [];
var albuns = [];
var playlists = [];

var dificuldades = [
    new Dificuldade("Fácil",false), 
    new Dificuldade("Médio",true), 
    new Dificuldade("Difícil",false)
];
var songson = 0, songsok = 0, tempo, intervalo, token;
carregando();
pegaCodigoSpotify();