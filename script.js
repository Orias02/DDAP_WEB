$(document).ready(function () {
    // Dark Mode Toggle
    $("#toggle-dark-mode").click(function () {
      $("body").toggleClass("dark-mode");
    });
  
    // To-Do List
    $("#add-todo").click(function () {
      const todo = $("#todo-input").val();
      if (todo.trim()) {
        $("#todo-list").append(`<li>${todo}</li>`);
        $("#todo-input").val("");
      }
    });
  
    // Calculator
    let calcInput = "";
    $(".calc-btn").click(function () {
      const value = $(this).text();
      if (value === "C") {
        calcInput = "";
        $("#calc-display").val("");
      } else if (value === "=") {
        try {
          const result = eval(calcInput);
          $("#calc-display").val(result);
          calcInput = result.toString();
        } catch {
          $("#calc-display").val("Error");
          calcInput = "";
        }
      } else {
        calcInput += value;
        $("#calc-display").val(calcInput);
      }
    });
  
    // Guess the Number
    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
  
    $("#submit-guess").click(function () {
      const guess = parseInt($("#guess-input").val());
      attempts++;
      if (isNaN(guess) || guess < 1 || guess > 100) {
        $("#guess-result").text("Masukkan angka antara 1 dan 100.");
      } else if (guess < targetNumber) {
        $("#guess-result").text("Terlalu rendah!");
      } else if (guess > targetNumber) {
        $("#guess-result").text("Terlalu tinggi!");
      } else {
        $("#guess-result").html(`Benar! Angka: ${targetNumber} (${attempts} kali coba)`);
        $("#reset-game").show();
        $("#submit-guess").prop("disabled", true);
      }
    });
  
    $("#reset-game").click(function () {
      targetNumber = Math.floor(Math.random() * 100) + 1;
      attempts = 0;
      $("#guess-input").val("");
      $("#guess-result").text("");
      $(this).hide();
      $("#submit-guess").prop("disabled", false);
    });
  
    // Unit Converter
    const units = {
      temperature: {
        units: ["Celsius", "Fahrenheit", "Kelvin"],
        convert: function (val, from, to) {
          if (from === to) return val;
          if (from === "Celsius") return to === "Fahrenheit" ? val * 9/5 + 32 : val + 273.15;
          if (from === "Fahrenheit") return to === "Celsius" ? (val - 32) * 5/9 : (val - 32) * 5/9 + 273.15;
          if (from === "Kelvin") return to === "Celsius" ? val - 273.15 : (val - 273.15) * 9/5 + 32;
        }
      },
      length: {
        units: ["Meter", "Kilometer", "Centimeter"],
        factor: { Meter: 1, Kilometer: 1000, Centimeter: 0.01 },
        convert: function (val, from, to) {
          return val * this.factor[from] / this.factor[to];
        }
      },
      weight: {
        units: ["Gram", "Kilogram", "Pound"],
        factor: { Gram: 1, Kilogram: 1000, Pound: 453.592 },
        convert: function (val, from, to) {
          return val * this.factor[from] / this.factor[to];
        }
      }
    };
  
    function updateUnitOptions(type) {
      const list = units[type].units;
      $("#unit-from, #unit-to").empty();
      list.forEach(unit => {
        $("#unit-from, #unit-to").append(`<option value="${unit}">${unit}</option>`);
      });
    }
  
    function convertUnits() {
      const type = $("#conversion-type").val();
      const val = parseFloat($("#unit-input").val());
      const from = $("#unit-from").val();
      const to = $("#unit-to").val();
      if (isNaN(val)) return $("#unit-result").text("Masukkan nilai yang valid.");
      const result = units[type].convert(val, from, to);
      $("#unit-result").text(`${val} ${from} = ${result.toFixed(2)} ${to}`);
    }
  
    $("#conversion-type").change(function () {
      updateUnitOptions(this.value);
      convertUnits();
    });
  
    $("#unit-from, #unit-to, #unit-input").on("input change", convertUnits);
    updateUnitOptions("temperature");
  });
  