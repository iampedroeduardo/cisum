class Song{
    constructor(id,nome,artista){
        this.nome = nome;
        this.id = id;
        this.artista = artista;
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
    constructor(id,nome,artista,foto,save){
        this.id = id;
        this.nome = nome;
        this.artista = artista;
        this.foto = foto;
        this.save = save;
        this.on = false;
        this.songs = [];
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
        if(document.querySelector(".menu") != null){
            menu();
        }
        if(this.on){
            this.element.setAttribute("class","artista on");
        }
        else{
            this.element.setAttribute("class","artista off");
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
    constructor(id,nome,foto){
        this.id = id
        this.nome = nome;
        this.foto = foto;
        this.on = false;
        this.songs = [];
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
        if(document.querySelector(".menu") != null){
            menu();
        }
        if(this.on){
            this.element.setAttribute("class","artista on");
        }
        else{
            this.element.setAttribute("class","artista off");
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
        this.on = false
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
        if(document.querySelector(".menu") != null){
            menu();
        }
        if(this.on){
            this.element.setAttribute("class","artista on");
        }
        else{
            this.element.setAttribute("class","artista off");
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
    var nome = tiraParenteses(nome).toLowerCase().replaceAll(".", "").replaceAll("&","and").replaceAll("?", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("ê","e").replaceAll("ú","u").replaceAll(":","").replaceAll("ã","a").replaceAll("ó","o").replaceAll("á","a").replaceAll("/","").replaceAll("é","e").trim();
    if(espaco){
        nome = nome.replaceAll(" ", "");
    }
    return nome;
}
function tiraParenteses(nome){
    var posicao1 = nome.indexOf("(");
    var posicao2 = nome.indexOf(")");
    do{
        if(posicao1 != -1 && posicao2 != -1){
            nome = nome.substring(0,posicao1)+nome.substring(posicao2+1);
        }
        var posicao1 = nome.indexOf("(");
        var posicao2 = nome.indexOf(")");
    }while(posicao1 != -1 && posicao2 != -1)
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
    for(var playlist of playlists){
        if(playlist.on){
            tof = true;
        }
    }
    if(!tof){
        var janela = document.createElement("div");
        janela.setAttribute("class","janela");
        janela.innerHTML = `
        <p>Nenhum álbum ou playlist foi selecionado!</p>
        `;
        document.querySelector("main").appendChild(janela);
        setTimeout(()=>{
            janela.remove();
        },3000);
    }
    return tof;
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
    p.setAttribute("class","titulop");
    p.innerHTML = "Olá "+perfil.display_name+"!";
    div.appendChild(p);
    var p = document.createElement("div");
    p.setAttribute("class","titulo");
    p.innerHTML = `
    <p>Artistas</p>
    <button class="mais" onclick="mais('artista')">+</button>
    `;
    div.appendChild(p);
    divart = document.createElement("div");
    divart.setAttribute("class","artistas");
    for(var artista of artistas){
        if(artista.on){
            divart.appendChild(artista.opcao());
        }
    }
    div.appendChild(divart);
    var p = document.createElement("div");
    p.setAttribute("class","titulo");
    p.innerHTML = `
    <p>Álbuns</p>
    <button class="mais" onclick="mais('album')">+</button>
    `;
    div.appendChild(p);
    divalb = document.createElement("div");
    divalb.setAttribute("class","albuns");
    for(var album of albuns){
        if(album.on){
            divalb.appendChild(album.opcao());
        }
    }
    div.appendChild(divalb);
    var p = document.createElement("div");
    p.setAttribute("class","titulo");
    p.innerHTML = `
    <p>Playlists</p>
    <button class="mais" onclick="mais('playlist')">+</button>
    `;
    div.appendChild(p);
    divalb = document.createElement("div");
    divalb.setAttribute("class","albuns");
    for(var playlist of playlists){
        if(playlist.on){
            divalb.appendChild(playlist.opcao());
        }
    }
    div.appendChild(divalb);
    var divdif = document.createElement("div");
    divdif.setAttribute("class","dificuldades");
    var p = document.createElement("p");
    p.setAttribute("class","titulop");
    p.innerHTML = "Dificuldade";
    div.appendChild(p);
    for(var dificuldade of dificuldades){
        divdif.appendChild(dificuldade.opcao());
    }
    div.appendChild(divdif);
    divjogar = document.createElement("div");
    divjogar.setAttribute("class","jogar");
    button = document.createElement("button");
    button.setAttribute("class","botaojogar");
    button.setAttribute("onclick","carregando();pegaMusicas();");
    button.innerHTML = "Jogar";
    divjogar.appendChild(button);
    div.appendChild(divjogar);
    main.appendChild(div);
}
function mais(tipo){
    var main = document.querySelector("main");
    main.innerHTML = "";
    var divpai = document.createElement("div");
    divpai.setAttribute("class","maisjanela");
    var div = document.createElement("div");
    div.setAttribute("class","espacos");
    if(tipo == "artista"){
        var p = document.createElement("p");
        p.setAttribute("class","titulop");
        p.innerHTML = "Seus Artistas Favoritos";
        var espaco = document.createElement("div");
        espaco.setAttribute("class","espaco");
        for(var artista of artistas){
            espaco.appendChild(artista.opcao());
        }
        div.appendChild(p);
        div.appendChild(espaco);
    }
    if(tipo == "album"){
        var p = document.createElement("p");
        p.setAttribute("class","titulop");
        p.innerHTML = "Seus Álbuns Favoritos";
        var espaco = document.createElement("div");
        espaco.setAttribute("class","espaco");
        for(var album of albuns){
            if(album.save){
                espaco.appendChild(album.opcao());
            }
        }
        div.appendChild(p);
        div.appendChild(espaco);
        var p = document.createElement("p");
        p.setAttribute("class","titulop");
        p.innerHTML = "Álbuns dos Seus Artistas Favoritos";
        for(artista of artistas){
            if(artista.on){
                var p2 = document.createElement("p");
                p2.setAttribute("class","titulop");
                p2.innerHTML = artista.nome;
                var espaco = document.createElement("div");
                espaco.setAttribute("class","espaco");
                for(var album of albuns){
                    if(album.artista == artista.id && !album.save){
                        espaco.appendChild(album.opcao());
                    }
                }
                div.appendChild(p2);
                div.appendChild(espaco);
            }
        }
    }
    if(tipo == "playlist"){
        var p = document.createElement("p");
        p.setAttribute("class","titulop");
        p.innerHTML = "Suas Playlists Favoritas";
        var espaco = document.createElement("div");
        espaco.setAttribute("class","espaco");
        for(var playlist of playlists){
            espaco.appendChild(playlist.opcao());
        }
        div.appendChild(p);
        div.appendChild(espaco);
    }
    divok = document.createElement("div");
    divok.setAttribute("class","jogar");
    button = document.createElement("button");
    button.setAttribute("class","botaojogar");
    button.setAttribute("onclick","menu()");
    button.innerHTML = "Ok";
    divpai.appendChild(div);
    divok.appendChild(button);
    divpai.appendChild(divok);
    main.appendChild(divpai);
}
function play(){
    if(testaCondicoes()){
        songson = musicas.length;
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
        for(var album of albuns){
            if(album.on){
                tabelas.appendChild(album.table());
            }
        }
        for(var playlist of playlists){
            if(playlist.on){
                tabelas.appendChild(playlist.table());
            }
        }
        div.appendChild(tabelas);
        main.appendChild(div);
        pontuacao();
        comecaTempo();
    }
}
function procuraAlbum(id){
    var tof = true;
    for(var j=0;j<albuns.length;j++){
        if(albuns[j].id == id){
            tof = false;
            break;
        }   
    }
    return tof;
}
function procuraMusica(id){
    var tof = true;
    for(var j=0;j<musicas.length;j++){
        if(musicas[j].id == id){
            tof = false;
            break;
        }   
    }
    return tof;
}
function achaMusica(id){
    var n;
    for(var j=0;j<musicas.length;j++){
        if(musicas[j].id == id){
            n = j;
            break;
        }   
    }
    return n;
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
        playlistsjson = playlistsjson.items;
        for(var playlist of playlistsjson){
            playlists.push(new Playlist(playlist.id,playlist.name,playlist.images[0].url));
        }
        var json = await fetch("https://api.spotify.com/v1/me/albums?limit=50",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        var albunsjson = await json.json();
        albunsjson = albunsjson.items
        for(var album of albunsjson){
            album = album.album;
            if(procuraAlbum(album.id)){
                albuns.push(new Album(album.id,album.name,album.artists[0].id,album.images[0].url,true));
            }
        }
        var json = await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50",{
            method:"GET",
            headers:{
                Authorization:"Bearer "+token
            }
        })
        var artistasjson = await json.json();
        artistasjson = artistasjson.artists;
        for(var i = 0; i<artistasjson.items.length; i++){
            artistas.push(new Artista(artistasjson.items[i].id,artistasjson.items[i].name,artistasjson.items[i].images[0].url));
            var json = await fetch("https://api.spotify.com/v1/artists/"+artistas[i].id+"/albums?include_groups=album&limit=50",{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var albunsjson = await json.json();
            albunsjson = albunsjson.items;
            for(var album of albunsjson){
                if(procuraAlbum(album.id)){
                    albuns.push(new Album(album.id,album.name,album.artists[0].id,album.images[0].url,false));
                }
            }
        }
    }catch(error){
        var carregando = document.querySelector(".carregando p");
        carregando.innerHTML = `Ocorreu um erro!`;
    }
    menu();
}
async function pegaMusicas(){
    for(var playlist of playlists){
        if(playlist.on){
            console.log("achou playlist"+playlist.nome);
            var json = await fetch("https://api.spotify.com/v1/playlists/"+playlist.id+"/tracks?fields=total",{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var n = await json.json();
            n = Math.round(n.total/50);
            for(var i = 0; i < n; i++){
                console.log("rodando fetch");
                var json = await fetch("https://api.spotify.com/v1/playlists/"+playlist.id+"/tracks?limit=50&offset="+i*50,{
                    method:"GET",
                    headers:{
                        Authorization:"Bearer "+token
                    }
                })
                json = await json.json();
                var songs = json.items;
                for(song of songs){
                    console.log(song);
                    song = song.track;
                    if(procuraMusica(song.id)){
                        musicas.push(new Song(song.id,song.name,song.artists[0].id));
                    }
                    playlist.songs.push(musicas[achaMusica(song.id)]);
                    console.log("colocando musica "+song.name+" na playlist")
                }
                
            }
        }
    }
    for(var album of albuns){
        if(album.on){
            var json = await fetch("https://api.spotify.com/v1/albums/"+album.id+"/tracks?limit=50",{
                method:"GET",
                headers:{
                    Authorization:"Bearer "+token
                }
            })
            var n = await json.json();
            var songs = n.items;
            for(var song of songs){
                if(procuraMusica(song.id)){
                    musicas.push(new Song(song.id,song.name,song.artists[0].id));
                }
                album.songs.push(musicas[achaMusica(song.id)]);
            }
        }
    }
    play();
}
function carregando(){
    document.querySelector("main").innerHTML = "";
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
var musicas = [];
var dificuldades = [
    new Dificuldade("Fácil",false), 
    new Dificuldade("Médio",true), 
    new Dificuldade("Difícil",false)
];
var songson = 0, songsok = 0, tempo, intervalo, token;
carregando();
pegaCodigoSpotify();