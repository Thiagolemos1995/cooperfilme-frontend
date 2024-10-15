export function HeroSection() {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
          url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/dexe47y-93532dcd-45cd-4381-8758-b6c5535c3a4e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUyOThiYWMwLWI4YmYtNGM4MC1hZjY3LTcyNWMxMjcyZGJiMFwvZGV4ZTQ3eS05MzUzMmRjZC00NWNkLTQzODEtODc1OC1iNmM1NTM1YzNhNGUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0._OCNwhauEgAp5HxfFfGyYAJt72-sQvTXsi4QdaFBsCE)
        `,
        backgroundSize: "cover",
        color: "white",
        padding: "100px 0",
        textAlign: "center",
        width: "100vw",
        height: "300px",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex flex-col items-center justify-center p-4 rounded-lg"
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <h1 className="text-4xl font-bold">Bem-vindo ao CooperFilme</h1>
          <p className="text-lg">Explore o mundo dos filmes com a gente!</p>
        </div>
      </div>
    </div>
  );
}
