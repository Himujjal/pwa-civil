import { h, Component, createRef } from "preact";
import swal from "sweetalert";

import { getY, getZ, convertToNumber } from "./calc";
import style from "./style";

import formFields from "./formFields";

class Home extends Component {
  state = {
    errors: {},
    formContents: {},
    x: 0,
    y: 0,
    z: 0
  };

  componentDidMount() {
    const formContents = {};
    const errors = {};
    formFields
      .filter(
        field => field.type !== "sectionHeader" && field.type !== "button"
      )
      .forEach(field => {
        formContents[field.name] = "";
        errors[field.name] = "";
      });
    this.setState({
      formContents,
      errors
    });
  }

  handleSubmit = e => {
    let isErrorThere = false;
    let isAnyFormFieldUnfilled = false;
    Object.keys(this.state.errors).forEach(err => {
      if (this.state.errors[err].length > 0) isErrorThere = true;
    });
    Object.keys(this.state.formContents).forEach(key => {
      if (this.state.formContents[key].length == 0)
        isAnyFormFieldUnfilled = true;
    });
    if (!isErrorThere && !isAnyFormFieldUnfilled) {
      const {
        districtName,
        roadType,
        roadNumber,
        startingPoint,
        endingPoint,
        rqrComfort,
        avComfort
      } = this.state.formContents;
      const x = convertToNumber(rqrComfort);
      console.log(convertToNumber(avComfort));
      const y = getY(convertToNumber(avComfort));
      const z = getZ(x, y);
      console.log(x, y, z);

      this.setState({ x, y, z });
      swal(
        "Result",
        `
	  Road Name: ${districtName}_${roadType}_${roadNumber}\n
	  of chainage: ${startingPoint}km to ${endingPoint}km\n
		has IRI value = ${z}km
	  `
      );
    } else {
      swal({
        title: "Error!",
        text: "Please check the form fields and try again!",
        icon: "error"
      });
    }
  };

  handleChange = (e, fieldName, errorValidator) => {
    const formContents = this.state.formContents;
    const errors = this.state.errors;
    errors[fieldName] = errorValidator(e.target.value);
    formContents[fieldName] = e.target.value;
    this.setState({ formContents });
  };

  render(props, { error }) {
    return (
      <div class={style.home}>
        <h1>Enter your details</h1>
        {formFields.map((field, i) => {
          if (field.type === "text") {
            return (
              <div class={style.formContainer}>
                <label class={style.formLabel}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  class={style.formInput}
                  placeholder={field.placeholder}
                  onChange={e =>
                    this.handleChange(e, field.name, field.errorValidator)
                  }
                />
                {this.state.errors[field.name] && (
                  <div class={style.formError}>
                    {this.state.errors[field.name]}
                  </div>
                )}
              </div>
            );
          } else if (field.type === "select") {
            return (
              <div class={style.formContainer}>
                <label class={style.formLabel}>{field.label}</label>
                <select
                  class={style.formInput}
                  placeholder={field.placeholder}
                  onChange={e =>
                    this.handleChange(e, field.name, field.errorValidator)
                  }
                >
                  {field.options.map((option, i) => (
                    <option value={option.value}>{option.text}</option>
                  ))}
                </select>
                {this.state.errors[field.name] && (
                  <div class={style.formError}>
                    {this.state.errors[field.name]}
                  </div>
                )}
              </div>
            );
          } else if (field.type === "number") {
            return (
              <div class={style.formContainer}>
                <label class={style.formLabel}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  class={style.formInput}
                  placeholder={field.placeholder}
                  onChange={e =>
                    this.handleChange(e, field.name, field.errorValidator)
                  }
                />
                {this.state.errors[field.name] && (
                  <div class={style.formError}>
                    {this.state.errors[field.name]}
                  </div>
                )}
              </div>
            );
          } else if (field.type === "button") {
            return (
              <button
                onClick={e => this.handleSubmit(e)}
                class={style.formButton}
              >
                {field.text}
              </button>
            );
          }
          return <h2>{field.text}</h2>;
        })}
      </div>
    );
  }
}

export default Home;
