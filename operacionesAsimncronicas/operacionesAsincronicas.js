const temporizador = (callback) => {
    setTimeout(() => {
        callback(0);
    }, 5000);
};
 
const operacion = () => console.log("se realiza la operacion");

console.log("inicio de tareas");

temporizador(operacion);    

console.log("fin de tareas");