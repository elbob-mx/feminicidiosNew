const victimas = [
    { nombre: "Ana López", ciudad: "Guadalajara", fecha: "2023-08-10" },
    { nombre: "María García", ciudad: "CDMX", fecha: "2022-11-22" },
    { nombre: "Juana Pérez", ciudad: "Monterrey", fecha: "2021-05-30" },
    { nombre: "Luisa Torres", ciudad: "Tijuana", fecha: "2024-01-19" },
    { nombre: "Carmen Ramírez", ciudad: "Puebla", fecha: "2023-02-15" },
    { nombre: "Patricia Martínez", ciudad: "León", fecha: "2023-06-14" },
    { nombre: "Verónica Herrera", ciudad: "Mérida", fecha: "2021-09-02" },
    { nombre: "Claudia Díaz", ciudad: "Chihuahua", fecha: "2020-12-08" },
    { nombre: "Rosalía Jiménez", ciudad: "Querétaro", fecha: "2022-07-11" },
    { nombre: "Gabriela López", ciudad: "Toluca", fecha: "2023-04-28" },
    { nombre: "Elena Cruz", ciudad: "Zacatecas", fecha: "2021-03-12" },
    { nombre: "Laura Ríos", ciudad: "Oaxaca", fecha: "2023-09-30" },
    { nombre: "Teresa Molina", ciudad: "Cancún", fecha: "2020-10-18" },
    { nombre: "Isabel Mejía", ciudad: "Saltillo", fecha: "2024-02-21" },
    { nombre: "Daniela Flores", ciudad: "Morelia", fecha: "2023-07-07" },
];

const wheel = document.getElementById("wheel");

// Variables que ajustaremos por tamaño de pantalla
let radius = 400;

function createWheel() {
    wheel.innerHTML = "";
    const intercalated = [];
    for (let i = 0; i < victimas.length; i++) {
        intercalated.push(victimas[i]);
        intercalated.push(null); // espacio vacío para separación
    }
    if (intercalated.length % 2 !== 0) intercalated.pop();
    const total = intercalated.length;

    intercalated.forEach((victima, i) => {
        const angle = (360 / total) * i;
        const el = document.createElement("div");
        el.className = "name-item";
        if (victima) {
            el.innerHTML = `
                <div class="nombre">${victima.nombre}</div>
                <div class="info">${victima.ciudad} &bull; ${victima.fecha}</div>
            `;
            el.style.opacity = "1";
        } else {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
        }
        wheel.appendChild(el);
        el.dataset.angle = angle;
    });
    return total;
}

let totalItems = createWheel();

function updatePositions(rotationX) {
    const degToRad = Math.PI / 180;
    [...wheel.children].forEach((el) => {
        const angle = parseFloat(el.dataset.angle);
        const totalAngle = (angle + rotationX) % 360;
        const rad = totalAngle * degToRad;

        const y = Math.sin(rad) * radius;
        const z = Math.cos(rad) * radius;

        const scaleBase = 0.85;
        const scale = scaleBase * (0.7 + ((z + radius) / (2 * radius)) * 1.5);

        const colorVal = Math.round(((z + radius) / (2 * radius)) * 242);
        const color = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

        const opacity = parseFloat(el.style.opacity);
        if (opacity > 0) {
            el.style.opacity = (0.3 + ((z + radius) / (2 * radius)) * 0.7).toFixed(2);
            el.style.color = color;
        }

        el.style.transform = `translateX(-50%) translateY(calc(50% + ${y}px)) translateZ(${z}px) scale(${scale.toFixed(
            2
        )})`;
    });
}

let rotationX = 0;
function animate() {
    rotationX += 0.025; // velocidad de rotación //
    if (rotationX >= 360) rotationX -= 360;
    updatePositions(rotationX);
    requestAnimationFrame(animate);
}

// Ajustar parámetros según tamaño ventana
function handleResize() {
    const width = window.innerWidth;

    if (width <= 480) {
        // móvil
        radius = 150;
        document.body.style.perspective = "900px";
    } else if (width <= 900) {
        // tablet
        radius = 250;
        document.body.style.perspective = "1200px";
    } else {
        // desktop
        radius = 400;
        document.body.style.perspective = "1500px";
    }
}

window.addEventListener("resize", () => {
    handleResize();
});

// Init
handleResize();
animate();
