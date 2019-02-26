import portugueseMessages from "ra-language-portuguese";

export default {
  ...portugueseMessages,
  pos: {
    search: "Procurar",
    configuration: "Configuração",
    language: "Idioma",
    theme: {
      name: "Tema",
      light: "Claro",
      dark: "Escuro"
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      new_customers: "New Customers",
      pending_orders: "Pending Orders",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items"
      },
      welcome: {
        title: "Welcome to react-admin demo",
        subtitle:
          "This is the admin of an imaginary poster shop. Fell free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
        aor_button: "react-admin site",
        demo_button: "Source for this demo"
      }
    }
  },
  resources: {
    products: {
      teste: "asiudhiasud",
      name: "Produto |||| Produtos",
      fields: {
        category_id: "Category",
        height_gte: "Min height",
        height_lte: "Max height",
        height: "Height",
        image: "Image",
        price: "Price",
        reference: "Reference",
        stock_lte: "Low Stock",
        stock: "Stock",
        thumbnail: "Thumbnail",
        width_gte: "Min width",
        width_lte: "Max width",
        width: "Width"
      },
      tabs: {
        image: "Image",
        details: "Details",
        description: "Description",
        reviews: "Reviews"
      }
    }
  },
  errors: {
    auth: {
      "auth/wrong-password":
        "Senha inválida ou o usuário não possui uma senha.",
      "auth/invalid-email": "O endereço de email está incorreto.",
      "auth/user-not-found": "Usuário não existe"
    }
  },
  validation: {
    isInteger: "Precisa ser número inteiro"
  }
};
