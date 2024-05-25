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
    constructor(nome,artista,songs){
        this.nome = nome;
        this.artista = artista;
        this.foto = "img/" + simplificaNome(nome,true) + ".png";
        for(var artista of artistas){
            if(artista.nome == this.artista){
                this.on = artista.on;
            }
        }
        this.songs = [];
        for(var i = 0; i < songs.length; i++){
            this.songs.push(new Song(songs[i]));
        }
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
        this.element.setAttribute("onclick","ativaAlbum('"+this.nome+"')");
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
function ativaAlbum(nome){
    for(var album of albuns){
        if(album.nome == nome){
            album.ativa();
        }
    }
}
class Artista{
    constructor(nome){
        this.nome = nome;
        this.foto = "img/" + simplificaNome(nome,true) + "artista.png";
        this.on = true;
    }
    opcao(){
        this.element = document.createElement("div");
        this.element.setAttribute("onclick","ativaArtista('"+this.nome+"')");
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
function ativaArtista(nome){
    for(var artista of artistas){
        if(artista.nome == nome){
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
        for(var dificuldade of dificuldades){
            if(dificuldade != this){
                dificuldade.on = false;
                dificuldade.element.setAttribute("class","dificuldade off");
            }
        }
        menu();
    }
}
function ativaDificuldade(nome){
    for(var dificuldade of dificuldades){
        if(dificuldade.nome == nome){
            dificuldade.ativa();
        }
    }
}
function simplificaNome(nome,espaco){
    var nome = nome.toLowerCase().replaceAll(".", "").replaceAll("?", "").replaceAll("'", "").replaceAll("!", "").replaceAll(",", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", "").replaceAll("ê","e").replaceAll("ú","u").replaceAll(":","").replaceAll("ã","a").replaceAll("ó","o").replaceAll("á","a").replaceAll("/","");
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
        if(songson<100){
            tempo = 15*60;
        }
        else if(songson<200){
            tempo = 25*60;
        }
        else{
            tempo = 35*60;
        }
    }
    if(dificuldades[1].on){
        if(songson<100){
            tempo = 10*60;
        }
        else if(songson<200){
            tempo = 20*60;
        }
        else{
            tempo = 30*60;
        }
    }
    if(dificuldades[2].on){
        if(songson<100){
            tempo = 5*60;
        }
        else if(songson<200){
            tempo = 15*60;
        }
        else{
            tempo = 25*60;
        }
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
    document.querySelector(".input").disabled = true;
    document.querySelector(".input").value = "Acabou!";
    document.querySelector(".input").style = "background-color:rgba(0,0,0,0);color:#81b71a;";
    document.querySelectorAll(".pausar")[0].innerHTML = "Acabou!";
    document.querySelectorAll(".pausar")[1].innerHTML = "Acabou!";
    document.querySelectorAll(".pausar")[0].setAttribute("onclick","");
    document.querySelectorAll(".pausar")[1].setAttribute("onclick","");
    document.querySelector(".contador").style.color = "#81b71a";
    if(songsok == songson){
        var msg = "Parabéns! Você conseguiu lembrar de todas!"
    }
    else if(tempo == 0){
        var msg = "Seu tempo acabou!";
    }
    else{
        var msg = "Você desistiu!";
    }
    var div = document.createElement("div");
    div.setAttribute("class","finish");
    div.innerHTML = `
    <p>${msg}</p>
    <div class="botoes">
        <button onclick="play();">Jogar Novamente</button>
        <button onclick="menu();">Menu</button>
    </div>
    `;
    for(var album of albuns){
        if(album.on){
            for(song of album.songs){
                if(!song.on){
                    song.ativa("black");
                }
            }
        }
    }
    document.querySelector("main").appendChild(div);
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
        if(album.on){
            divalb.appendChild(album.opcao());
        }
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
var artistas = [
    new Artista("Taylor Swift"),
    new Artista("Jão"),
    new Artista("Cavetown")
];
var albuns = [
    new Album("Taylor Swift","Taylor Swift",["Tim McGraw","Picture To Burn","Teardrops On My Guitar","A Place In This World","Cold As You","The Outside","Tied Together With A Smile","Stay Beautiful","Should've Said No","Mary's Song (Oh My, My, My)","Our Song","I'm Only Me When I'm With You","Invisible","A Perfectly Good Heart"]),
    new Album("Fearless","Taylor Swift",["Fearless","Fifteen","Love Story","Hey Stephen","White Horse","You Belong With Me","Breathe","Tell Me Why","You're Not Sorry","The Way I Loved You","Forever And Always","The Best Day","Change","Jump Then Fall","Untouchable","Come In With The Rain","Superstar","The Other Side Of The Door","Today Was A Fairytale","You All Over Me","Mr. Perfectly Fine","We Were Happy","That's When","Don't You","Bye Bye Baby"]),
    new Album("Speak Now","Taylor Swift",["Mine","Sparks Fly","Back To December","Speak Now","Dear John","Mean","The Story Of Us","Never Grow Up","Enchanted","Better Than Revenge","Innocent","Haunted","Last Kiss","Long Live","Ours","Superman","Electric Touch","When Emma Falls In Love","I Can See You","Castles Crumbling","Foolish One","Timeless"]),
    new Album("Red","Taylor Swift",["State Of Grace","Red","Treacherous","I Knew You Were Trouble","All Too Well","22","I Almost Do","We Are Never Ever Getting Back Together","Stay Stay Stay","The Last Time","Holy Ground","Sad Beautiful Tragic","The Lucky One","Everything Has Changed","Starlight","Begin Again","The Moment I Knew","Come Back... Be Here","Girl At Home","Ronan","Better Man","Nothing New","Babe","Message In A Bottle","I Bet You Think About Me","Forever Winter","Run","The Very First Night"]),
    new Album("1989","Taylor Swift",["Welcome To New York","Blank Space","Style","Out Of The Woods","All You Had To Do Was Stay","Shake It Off","I Wish You Would","Bad Blood","Wildest Dreams","How You Get The Girl","This Love","I Know Places","Clean","Wonderland","You Are In Love","New Romantics","Slut!","Say Don't Go","Now That We Don't Talk","Suburban Legends","Is It Over Now?"]),
    new Album("reputation","Taylor Swift",["...Ready For It?","Endgame","I Did Something Bad","Don't Blame Me","Delicate","Look What You Made Me Do","So It Goes...","Gorgeous","Getaway Car","King Of My Heart","Dancing With Our Hands Tied","Dress","This Is Why We Can't Have Nice Things","Call It What You Want","New Year's Day"]),
    new Album("Lover","Taylor Swift",["I Forgot That You Existed","Cruel Summer","Lover","The Man","The Archer","I Think He Knows","Miss Americana And The Heartbreak Prince","Paper Rings","Cornelia Street","Death By A Thousand Cuts","London Boy","Soon You'll Get Better","False God","You Need To Calm Down","Afterglow","ME!","It's Nice To Have A Friend","Daylight","All Of The Girls You Loved Before"]),
    new Album("folklore","Taylor Swift",["the 1","cardigan","the last great american dynasty","exile","my tears ricochet","mirrorball","seven","august","this is me trying","illicit affairs","invisible string","mad woman","epiphany","betty","peace","hoax","the lakes"]),
    new Album("evermore","Taylor Swift",["willow","champagne problems","gold rush","'tis the damn season","tolerate it","no body, no crime","happiness","dorothea","coney island","ivy","cowboy like me","long story short","marjorie","closure","evermore","right where you left me","it's time to go"]),
    new Album("Midnights","Taylor Swift",["Lavender Haze","Maroon","Anti-Hero","Snow On The Beach","You're On Your Own, Kid","Midnight Rain","Question...?","Bejeweled","Vigilante Shit","Labyrinth","Karma","Sweet Nothing","Mastermind","The Great War","Bigger Than The Whole Sky","Paris","High Infidelity","Glitch","Would've, Could've, Should've","Dear Reader","Hits Different","You're Losing Me"]),
    new Album("The Tortured Poets Department","Taylor Swift",["Fortnight","The Tortured Poets Department","My Boy Only Breaks His Favorite Toys","Down Bad","So Long, London","But Daddy I Love Him", "Fresh Out The Slammer","Florida!!!","Guilty as Sin?","Who's Afraid Of Little Old Me?","I Can Fix Him (No Really I Can)","loml","I Can Do It With a Broken Heart","The Smallest Man Who Ever Lived","The Alchemy","Clara Bow","The Black Dog","imgonnagetyouback","The Albatross","Chloe or Sam or Sophia or Marcus","How Did It End","So High School","I Hate It Here","thanK you aIMee","I Look in People's Windows","The Prophecy","Cassandra","Peter","The Bolter","Robin","The Manuscript"]),
    new Album("Lobos","Jão",["Vou Morrer Sozinho","Me Beija Com Raiva","Lindo Demais","Imaturo","Ainda Te Amo","A Rua","Lobos","Eu Quero Ser Como Você","Aqui","Monstros","Fim do Mundo","Ressaca"]),
    new Album("Anti-Herói","Jão",["A Última Noite","Triste Pra Sempre","Enquanto Me Beija","Essa Eu Fiz Pro Nosso Amor","Fim De Festa","Barcelona","Você Vai Me Destruir","VSF","Hotel San Diego",":((Nota De Voz 8)"]),
    new Album("Pirata","Jão",["Clarão","Não Te Amo","Idiota","Santo","Acontece","Você Me Perdeu","Meninos e Meninas","Coringa","Doce","Tempos de Glória","Olhos Vermelhos"]),
    new Album("Super","Jão",["Escorpião","Me Lambe","Gameboy","Alinhamento Milenar","Lábia","Maria","Julho","Eu Posso Ser Como Você","Sinais","Se O Problema Era Você, Por Que Doeu Em Mim?","Locadora","Rádio","São Paulo, 2015","Super"]),
    new Album("Cavetown","Cavetown",["Meteor Shower","Everything Is Temporary (Sticks and Stones)","We're Alive","Hazel","Untitled V.2","Intermission","Banana Bread","Devil Town"]),
    new Album("16 / 04 / 16","Cavetown",["Night Knuckles","BG Noise","Psychometry","So Much","Calpol","Snake and the Prairie dogs","16 / 04 / 16 (Jack's Song)","Irrational","Nostalgia in my BedRoom","LavalceRink","Trenchh","Sliiping Lately"]),
    new Album("Lemon Boy","Cavetown",["Lemon Boy","Green","It's U","Fool","Another One of Those Days","Taking Care of Things","Big Bowl in the Sky","888","Poison","10 Feet All","I'll Make Cereal","Pigeon"]),
    new Album("Sleepyhead","Cavetown",["Sweet Tooth","For You","Telescope","Feb 14","Pyjama Pants","Trying","Things That Make It Warm","Snail","Wishing Well","I Miss My Mum","Empty Bed"]),
    new Album("worm food","Cavetown",["worm food","kill u","frog","a kind thing to do","1994","better","wasabi","fall in love with a girl","grey space","heart attack","i swear to god","juno","laundry day"])
];
var dificuldades = [
    new Dificuldade("Fácil",false), 
    new Dificuldade("Médio",true), 
    new Dificuldade("Difícil",false)
];
var songson = 0, songsok = 0, tempo, intervalo;
menu();