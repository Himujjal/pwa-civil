import { convertToNumber } from "./calc";
const formFields = [
  {
    type: "text",
    label: "Enter the District name:",
    placeholder: "District name...",
    name: "districtName",
    errorValidator: text => (text.length === 0 ? "Required" : "")
  },
  {
    type: "select",
    label: "Enter the type of road:",
    name: "roadType",
    placeholder: "Road Type...",
    options: [
      { value: "", text: "None" },
      { value: "SH", text: "SH" },
      { value: "MDR", text: "MDR" }
    ],
    errorValidator: text => (text.length === 0 ? "Required" : "")
  },
  {
    type: "number",
    label: "Enter the road number:",
    placeholder: "Road Number...",
    name: "roadNumber",
    errorValidator: text =>
      typeof text == "number" && parseInt(text) === 0 ? "Enter a number..." : ""
  },
  {
    type: "sectionHeader",
    text: "Enter the Chainage:"
  },
  {
    type: "number",
    label: "Enter Starting point (in km):",
    placeholder: "Starting Point...",
    name: "startingPoint",
    errorValidator: text =>
      typeof text == "string" && parseInt(text) === 0 ? "Enter a number..." : ""
  },
  {
    type: "number",
    label: "Enter Ending point (in km):",
    placeholder: "Ending Point...",
    name: "endingPoint",
    errorValidator: text =>
      typeof text == "string" && parseInt(text) === 0 ? "Enter a number..." : ""
  },
  {
    type: "select",
    label: "Enter RQR(comfort):",
    name: "rqrComfort",
    placeholder: "RQR...",
    options: [
      { value: 0, text: "None" },
      { value: 90, text: "Excellent (very smooth ride)" },
      { value: 70, text: "Good (smooth ride with just a few bumps)" },
      {
        value: 50,
        text: "Fair (Still comfortable ride with intermittent bumps)"
      },
      { value: 30, text: "Poor (uncomfortable Ride with frequent bumps" },
      {
        value: 10,
        text:
          "Very poor (uncomfortable ride with constant bumps results in rattle or shake of vehicle"
      }
    ],
    errorValidator: text => {
      return convertToNumber(text) === 0 ? "Required" : "";
    }
  },
  {
    type: "number",
    label: "Enter Average Comfortable Speed (in kmph)",
    placeholder: "Avg. Comfortable Speed (kmph)...",
    name: "avComfort",
    errorValidator: text =>
      typeof text == "number" && parseInt(text) === 0 ? "Enter a number..." : ""
  },
  {
    type: "button",
    text: "Submit"
  }
];

export default formFields;
