class Carro {
    constructor(placa, dueno) {
        this.placa = placa;
        this.dueno = dueno;
        this.modo = "P";
        this.frenoMano = true;
        this.encendido = false;
        this.freno = false;
        this.acelerador = false;
        this.direccion = "C";
        this.ruta = new Ruta();
        this.ruta.crearRuta();
        this.tiempoTotal = 0;
        this.distanciaTotal = 0;
        this.velocidadAproximada = 0;
        this.velocidadMaxima = 0;
    }

    encender() {
        this.frenoMano = false;
        this.freno = true;
        this.modo = "P";
        this.encendido = true;
        this.modo = "D";
        return "Freno de mano <b>desactivado</b><br>Freno de pedal <b>activado</b><br>Modo P (Parking) <b>activado</b><br>Auto encendido<br>Modo D (Driving) <b>activado</b><br>";
    }

    arrancar() {
        this.freno = false;
        this.acelerador = true;
        return "Freno de pedal <b>desactivado</b><br>Acelerador <b>activado</b><br>";
    }

    frenar() {
        this.acelerador = false;
        this.freno = true;
        return "Acelerador <b>desactivado</b><br>Freno de pedal <b>activado</b><br>";
    }

    parquear() {
        this.freno = true;
        this.modo = "N";
        this.frenoMano = true;
        this.freno = false;
        this.freno = true;
        this.modo = "P";
        this.freno = false;
        this.encendido = false;
        return "Freno de pedal <b>activado</b><br>Modo N (Neutral) <b>activado</b><br>Freno de mano <b>activado</b><br>Freno de pedal <b>desactivado</b><br>Freno de pedal <b>activado</b><br>Modo P (Parking) <b>activado</b><br>Freno de pedal <b>desactivado</b><br>Auto apagado<br>"
    }

    reversar() {
        this.freno = true;
        this.modo = "R";
        this.freno = false;
        return "Freno de pedal <b>activado</b><br>Modo R (Reverse) <b>activado</b><br>Freno de pedal <b>desactivado</b><br>";
    }

    girarDerecha() {
        const frenar = this.frenar();
        this.direccion = "R";
        return "Direccional -> <b>activada</b><br>" + frenar + "Girando a la derecha<br>";
    }
    girarIzquierda() {
        const frenar = this.frenar();
        this.direccion = "L";
        return "Direccional <- <b>activada</b><br>" + frenar + "Girando a la izquierda<br>";
    }

    girarCentro() {
        const acelerar = this.arrancar();
        this.direccion = "C";
        return "Retomando centro<br>" + acelerar;
    }

    hallarTiempoTotal() {
        let tiempoTotal = 0;
        const tramo = this.ruta.tramo;
        for (let i = 0; i < tramo.length; i++) {
            tiempoTotal += tramo[i].tiempoParada + tramo[i].tiempo;
        }
        this.tiempoTotal = tiempoTotal;
    }
    

    hallarVelocidadAproximada() {
        let tiempo = 0;
        let distancia = 0;
        const tramo = this.ruta.tramo;
        for (let i = 0; i < tramo.length; i++) {
            tiempo += tramo[i].tiempo;
            distancia += tramo[i].distancia;
        }
        this.velocidadAproximada = (distancia / tiempo) * 3.6
    }

    hallaVelocidadMaxima() {
        let velocidadMaxima = 0;
        const tramo = this.ruta.tramo;
        for (let i = 0; i < tramo.length; i++) {
            let velocidad = (tramo[i].distancia / tramo[i].tiempo) * 3.6;
            if (velocidad > velocidadMaxima) velocidadMaxima = velocidad;
        }
        this.velocidadMaxima = velocidadMaxima;
    }

    hallarDistanciaTotal() {
        let distanciaTotal = 0;
        const tramo = this.ruta.tramo;
        for (let i = 0; i < tramo.length; i++) {
            distanciaTotal += tramo[i].distancia;
        }
        this.distanciaTotal = distanciaTotal;
    }
}
class Ruta {
    constructor() {
        this.tramo = [];
    }
    addParada() {
        const ditancia = Math.floor(Math.random() * (1000 - 100)) + 100;
        const tiempo = Math.floor(Math.random() * (120 - 50)) + 50;
        const tiempoParada = Math.floor(Math.random() * (10 - 5)) + 5;
        this.tramo.push(new Tramo(ditancia, tiempo, tiempoParada));
    }

    crearRuta() {
        const numParadas = Math.floor(Math.random() * (5 - 1)) + 1;
        for (let i = 1; i <= numParadas; i++) {
            this.addParada();
        }
    }
}

class Tramo {
    constructor(distancia, tiempo, tiempoParada) {
        this.distancia = distancia;
        this.tiempo = tiempo;
        this.tiempoParada = tiempoParada;
    }
}

function cronometrar() {
    escribir();
    id = setInterval(escribir, 1000);
}

function escribir() {
    //Detenemos al llegar al destino. 
    if (tramos.length == 0) {
        clearInterval(id);
        return;
    }
    //Detectamos cuando existe una parada  
    if (!parada && tramos[0].tiempo == s) {
        $parrafo.innerHTML += myCar.frenar();
        parada = true;
        s = 0;
    }
    //Reiniciamos cada vez que la parada se acaba.
    if (parada && tramos[0].tiempoParada == s) {
        $parrafo.innerHTML += `Fin tramo con distancia de: ${tramos[0].distancia}m y duración de: ${tramos[0].tiempo}s<br>`;
        tramos.shift();
        if (tramos.length != 0) {
            $parrafo.innerHTML += `Inicio tramo con distancia de: ${tramos[0].distancia}m y duración de: ${tramos[0].tiempo}s<br>`;
            $parrafo.innerHTML += myCar.arrancar();
        }
        s = 0;
        parada = false;
    }
    // Cada segundo se actualiza información, segundo actual, estado (Parada o En camino), tramos faltantes y en algunos casos se gira el vehiculo. 
    if (tramos.length != 0) {
        s++;
        if (parada) {
            $parrafo.innerHTML += `<b>Segundo:</b> ${s}  <b>Estado:</b> Parada  <b>Tramos faltantes:</b> ${tramos.length}<br>`;
        } else {
            $parrafo.innerHTML += `<b>Segundo:</b> ${s}  <b>Estado:</b> En camino  <b>Tramos faltantes:</b> ${tramos.length}<br>`;
            const bandera = [Math.floor(Math.random() * 50), Math.floor(Math.random() * 2)];
            if (bandera[0] == 5) {
                if (bandera[1] == 0) $parrafo.innerHTML += myCar.girarDerecha();
                else $parrafo.innerHTML += myCar.girarIzquierda();
                $parrafo.innerHTML += myCar.girarCentro();
            }
        }
    }

}

//Se crea el objeto myCar de la clase Carro
const myCar = new Carro("JUG-986", "SAMUEL");
const tramos = myCar.ruta.tramo;

//Obtenemos la conexión con el parrafo que mostrará los resultados en el index.html
const $parrafo = document.getElementById("texto");

console.log(tramos);
let s = 0;
let id;
let parada = false;
//Hallamos los resultados de los sensores
myCar.hallarTiempoTotal();
myCar.hallaVelocidadMaxima();
myCar.hallarVelocidadAproximada();
myCar.hallarDistanciaTotal();

$parrafo.innerHTML += `<b>Recorrido generado</b> { Distancia total: ${myCar.distanciaTotal}m, # de paradas: ${myCar.ruta.tramo.length},
Tiempo estimado ${myCar.tiempoTotal}s }<br>`

$parrafo.innerHTML += myCar.encender();
$parrafo.innerHTML += myCar.arrancar();
//Comenzamos el recorrido con el método cronometrar. 
cronometrar();
setTimeout(() => {
    $parrafo.innerHTML += myCar.reversar();
    $parrafo.innerHTML += myCar.parquear();
    $parrafo.innerHTML += `Resultados sensores {Tiempo total: ${myCar.tiempoTotal}s, Velocidad aproximada: ${myCar.velocidadAproximada}km/h, 
    Velocidad máxima: ${myCar.velocidadMaxima}km/h }<br>`
}, myCar.tiempoTotal * 1000);
