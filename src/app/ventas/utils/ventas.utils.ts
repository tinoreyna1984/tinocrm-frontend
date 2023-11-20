export function generarCodigo(cadena: String, numero: Number): String {
  // Convertir la cadena a mayúsculas
  const cadenaMayusculas = cadena.toUpperCase();

  // Formatear el número con ceros a la izquierda para que tenga al menos 10 dígitos
  const numeroFormateado = String(numero).padStart(10, '0');

  // Generar el código combinando la cadena y el número formateado
  const codigo = `${cadenaMayusculas}${numeroFormateado}`;

  return codigo;
}
