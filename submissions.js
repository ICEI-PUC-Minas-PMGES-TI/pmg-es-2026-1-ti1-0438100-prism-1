const API_BASE = "http://localhost:3001";

async function load() {
  const listEl = document.getElementById("list");
  listEl.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(`${API_BASE}/submissions`);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      throw new Error(`API respondeu com status ${res.status}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error(
        "A API não retornou JSON. Verifique se o JSONServer está rodando em localhost:3001.",
      );
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      listEl.innerHTML = "<p>Nenhum envio encontrado.</p>";
      return;
    }

    const rows = data
      .map((item) => {
        return `
        <tr data-id="${item.id}">
          <td>${item.id}</td>
          <td>${escapeHtml(item.fullName || "")}</td>
          <td>${escapeHtml(item.cpf || "")}</td>
          <td>${escapeHtml(item.renda || "")}</td>
          <td>
            <button class="send">Enviar</button>
            <button class="delete">Excluir</button>
            <button class="view">Ver JSON</button>
          </td>
        </tr>
      `;
      })
      .join("");

    listEl.innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>Nome</th><th>CPF</th><th>Renda</th><th>Ações</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    listEl.querySelectorAll("button.delete").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.closest("tr").dataset.id;
        if (!confirm("Confirma exclusão do envio " + id + "?")) return;
        await fetch(`${API_BASE}/submissions/` + id, { method: "DELETE" });
        load();
      });
    });

    listEl.querySelectorAll("button.view").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest("tr").dataset.id;
        const item = data.find((d) => String(d.id) === String(id));
        alert(JSON.stringify(item, null, 2));
      });
    });

    listEl.querySelectorAll("button.send").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.closest("tr").dataset.id;
        const item = data.find((d) => String(d.id) === String(id));
        const forwardUrl = document.getElementById("forwardUrl").value.trim();
        if (!forwardUrl) return alert("Informe a URL para onde enviar.");

        try {
          const r = await fetch(forwardUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
          if (!r.ok) throw new Error("Falha no envio");
          alert("Enviado com sucesso para " + forwardUrl);
        } catch (err) {
          alert("Erro ao enviar: " + err.message);
        }
      });
    });
  } catch (err) {
    listEl.innerHTML = "<p>Erro carregando envios: " + err.message + "</p>";
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.getElementById("forwardAll").addEventListener("click", async () => {
  const forwardUrl = document.getElementById("forwardUrl").value.trim();
  if (!forwardUrl) return alert("Informe a URL para onde enviar.");
  try {
    const res = await fetch(`${API_BASE}/submissions`);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      throw new Error(`API respondeu com status ${res.status}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error(
        "A API não retornou JSON. Verifique se o JSONServer está rodando em localhost:3001.",
      );
    }

    const data = await res.json();
    for (const item of data) {
      await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
    }
    alert("Todos enviados.");
  } catch (err) {
    alert("Erro ao enviar: " + err.message);
  }
});

load();
