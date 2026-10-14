import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  // Função para deslogar integrada ao seu sistema
  function sair() {
    localStorage.removeItem("logado");
    navigate("/");
  }

  // Lista de categorias de comidas (imagem 3 do Excalidraw)
  const comidas = [
    { id: 1, nome: "Pizza", icone: "🍕" },
    { id: 2, nome: "Hambúrguer", icone: "🍔" },
    { id: 3, nome: "Sushi", icone: "🍣" },
    { id: 4, nome: "Sorvete", icone: "🍦" },
    { id: 5, nome: "Massas", icone: "🍝" },
    { id: 6, nome: "Bebidas", icone: "🥤" },
    { id: 7, nome: "Sobremesas", icone: "🍰" },
    { id: 8, nome: "Saudável", icone: "🥗" },
  ];

  // Lista dos principais restaurantes (imagem 4 do Excalidraw)
  const restaurantes = [
    { id: 1, nome: "Burger House", nota: "4.9", tempo: "20-30 min", frete: "Grátis", logo: "🍔", categoria: "Hambúrguer" },
    { id: 2, nome: "Bella Italia Pizza", nota: "4.8", tempo: "35-45 min", frete: "R$ 5,90", logo: "🍕", categoria: "Pizza" },
    { id: 3, nome: "Sakura Sushi Bar", nota: "4.9", tempo: "40-50 min", frete: "Grátis", logo: "🍣", categoria: "Sushi" },
    { id: 4, nome: "Gelato & Cia", nota: "4.7", tempo: "15-25 min", frete: "R$ 3,50", logo: "🍦", categoria: "Sorvete" },
    { id: 5, nome: "Pasta Mia", nota: "4.6", tempo: "30-40 min", frete: "R$ 4,00", logo: "🍝", categoria: "Massas" },
    { id: 6, nome: "Green Salad", nota: "4.8", tempo: "20-30 min", frete: "Grátis", logo: "🥗", categoria: "Saudável" },
  ];

  // Filtra restaurantes pela busca e pela categoria selecionada
  const restaurantesFiltrados = restaurantes.filter((rest) => {
    const bateCategoria = !categoriaAtiva || rest.categoria === categoriaAtiva;
    const bateBusca = rest.nome.toLowerCase().includes(busca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  return (
    <div className="home-container">
      {/* 1. HEADER */}
      <header className="header">
        <div className="header-left">
          <button
            className="btn-mais-opcoes"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            ☰ Mais opções
          </button>

          {/* Menu suspenso que se abre ao clicar */}
          {menuAberto && (
            <div className="dropdown-menu">
              <a href="#perfil">👤 Meu Perfil</a>
              <a href="#pedidos">📦 Meus Pedidos</a>
              <a href="#favoritos">❤️ Favoritos</a>
              <hr />
              <button className="btn-sair-menu" onClick={sair}>
                🚪 Sair da Conta
              </button>
            </div>
          )}
        </div>

        <div className="header-right">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por restaurantes..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 2. PROMOÇÃO */}
      <section className="promocao-container">
        <div className="promocao-banner">
          <div className="promocao-texto">
            <span className="promocao-tag">PROMOÇÃO ESPECIAL</span>
            <h2>Até 50% OFF no seu primeiro pedido!</h2>
            <p>Aproveite os melhores restaurantes com entregas super rápidas.</p>
            <button className="btn-aproveitar">Aproveitar Agora</button>
          </div>
          <div className="promocao-icone">🎁</div>
        </div>
      </section>

      {/* 3. COMIDAS */}
      <section className="secao-comidas">
        <h3>Comidas</h3>
        <div className="comidas-carrossel">
          {comidas.map((item) => (
            <div
              key={item.id}
              className={`card-comida ${
                categoriaAtiva === item.nome ? "ativa" : ""
              }`}
              onClick={() =>
                setCategoriaAtiva(
                  categoriaAtiva === item.nome ? null : item.nome
                )
              }
            >
              <span className="icone-comida">{item.icone}</span>
              <span className="nome-comida">{item.nome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRINCIPAIS RESTAURANTES */}
      <section className="secao-restaurantes">
        <div className="secao-header">
          <h3>Principais Restaurantes</h3>
          <p className="subtitulo-secao">Os restaurantes mais bem avaliados do site</p>
        </div>

        <div className="restaurantes-grid">
          {restaurantesFiltrados.length > 0 ? (
            restaurantesFiltrados.map((rest) => (
              <div key={rest.id} className="card-restaurante">
                <div className="logo-restaurante">{rest.logo}</div>
                <div className="info-restaurante">
                  <h4>{rest.nome}</h4>
                  <div className="detalhes-restaurante">
                    <span className="nota">⭐ {rest.nota}</span>
                    <span>•</span>
                    <span className="tempo">{rest.tempo}</span>
                    <span>•</span>
                    <span className="frete">{rest.frete}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="sem-resultados">Nenhum restaurante encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;