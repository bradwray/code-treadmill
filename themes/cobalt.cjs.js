var theme = {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#193549",
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic",
      },
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "#ffc600",
        fontStyle: "italic",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic",
      },
    },
    {
      types: ["string", "url"],
      style: {
        color: "#9DF39F",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(214, 222, 235)",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#F85B79",
      },
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "#ffc600",
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "#eee",
      },
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "red",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "#FF9D00",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#FF9D00",
      },
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)",
      },
    },
    {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)",
      },
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)",
      },
    },
  ],
};
module.exports = theme;
