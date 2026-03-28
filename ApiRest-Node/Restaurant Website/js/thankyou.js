document.addEventListener('DOMContentLoaded', () => {
    const labelNumero = document.getElementById('numero-pedido-final');
    
    if (labelNumero) {
        const numPedido = localStorage.getItem('numeroPedido');
        labelNumero.textContent = numPedido ? `#PED-${numPedido}` : '#PED-000001';
        
        localStorage.removeItem('numeroPedido');
    }
});