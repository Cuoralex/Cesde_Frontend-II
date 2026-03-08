document.addEventListener('DOMContentLoaded', () => {
    const labelNumero = document.getElementById('numero-pedido-final'); [cite: 1239]
    
    Solo ejecutar si el elemento existe en el HTML actual [cite: 1241]
    if (labelNumero) {
        const numPedido = localStorage.getItem('numeroPedido');
        labelNumero.textContent = numPedido ? `#PED-${numPedido}` : '#PED-000001'; [cite: 1242, 1245]
        
        Limpiar para evitar duplicados [cite: 1250]
        localStorage.removeItem('numeroPedido');
    }
});