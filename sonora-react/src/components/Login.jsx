export function Login() {
  return (
    <main className="pagina-central">
      {/* INICIAR SESIÓN */}
      <section className="barra-lateral">
        <h2>Iniciar Sesión</h2>
        <p>Ingresa los datos de tu cuenta (Prueba: usuario@udp.cl / 123456).</p>
        <form id="form-login">
          <label htmlFor="correo">Correo:</label><br />
          <input 
            type="email" 
            id="correo" 
            required 
            style={{ width: '90%', marginBottom: '10px' }} 
          /><br />
          
          <label htmlFor="pass">Contraseña:</label><br />
          <input 
            type="password" 
            id="pass" 
            required 
            style={{ width: '90%', marginBottom: '20px' }} 
          /><br />
          
          <p id="mensaje-login"></p>
          <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>
            Ingresar
          </button>
        </form>
      </section>

      {/* REGISTRO DE CUENTA */}
      <section className="barra-lateral">
        <h2>Crear Cuenta</h2>
        <p>¿Aún no tienes cuenta? ¡Súmate a la comunidad de Sonora!</p>
        <form id="form-registro">
          <label htmlFor="reg-nombre">Nombre de usuario:</label><br />
          <input 
            type="text" 
            id="reg-nombre" 
            required 
            minLength={3} 
            style={{ width: '90%', marginBottom: '10px' }} 
          /><br />

          <label htmlFor="reg-nac">Fecha de nacimiento:</label><br />
          <input 
            type="date" 
            id="reg-nac" 
            max="2026-01-01" 
            required 
            style={{ width: '90%', marginBottom: '10px' }} 
          /><br />

          <label htmlFor="reg-correo">Correo:</label><br />
          <input 
            type="email" 
            id="reg-correo" 
            required 
            style={{ width: '90%', marginBottom: '10px' }} 
          /><br />
          
          <label htmlFor="reg-pass">Contraseña:</label><br />
          <input 
            type="password" 
            id="reg-pass" 
            required 
            minLength={6} 
            style={{ width: '90%', marginBottom: '10px' }} 
          /><br />

          <label htmlFor="reg-rol">Rol en Sonora:</label><br />
          <select 
            id="reg-rol" 
            required 
            style={{ width: '90%', marginBottom: '20px' }}
          >
            <option value="Oyente">Oyente</option>
            <option value="Artista">Artista o editor</option>
          </select><br />

          <p id="mensaje-registro"></p>
          <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>
            Registrarse
          </button>
        </form>
      </section>
    </main>
  );
}