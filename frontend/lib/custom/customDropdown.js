const buddhistTermsJson = [
  {
    name: "Mindfulness",
    value: "Sati",
  },
  {
    name: "Compassion",
    value: "Karuna",
  },
  {
    name: "Loving-kindness",
    value: "Metta",
  },
  {
    name: "Equanimity",
    value: "Upekkha",
  },
  {
    name: "Wisdom",
    value: "Prajna",
  },
  {
    name: "Morality",
    value: "Sila",
  },
  {
    name: "Meditation",
    value: "Dhyana/Samadhi",
  },
  {
    name: "Suffering",
    value: "Dukkha",
  },
  {
    name: "Impermanence",
    value: "Anicca",
  },
  {
    name: "Non-self",
    value: "Anatta",
  },
  {
    name: "Enlightenment",
    value: "Bodhi",
  },
  {
    name: "Rebirth",
    value: "Samsara",
  },
  {
    name: "Dependent Origination",
    value: "Paticcasamuppada",
  },
  {
    name: "The Middle Way",
    value: "Majjhima Patipada",
  },
];

export function createCustomDropdown(selectId) {
  const jsonData = buddhistTermsJson;
  const select = document.createElement("select");
  select.id = selectId;

  jsonData.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.name;
    select.appendChild(option);
  });

  // Add event listener for the dropdown
  select.addEventListener("change", function () {
    console.log("===>change", this.value);
  });

  return select;
}