export async function validarAcceso(permisosPermitidos = []) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Acceso inválido, se redirigirá al módulo de ingreso");
    window.location.href = "../";
    return null;
  }

  try {
    const response = await fetch("https://hospitalproyect-production.up.railway.app/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Token inválido");

    const data = await response.json();

    if (!permisosPermitidos.includes(data.permisos)) {
      alert("No tienes permisos para acceder a esta página");
      window.location.href = "../";
      return null;
    }

    return data.cedula;
  } catch (err) {
    console.error(err);
    alert("Error de autenticación");
    window.location.href = "../";
    return null;
  }
}