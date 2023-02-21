"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const menuProgramms = document.querySelectorAll(".menu-programm"),
        resultProgramms = document.querySelectorAll(".result-programm"),
        programmBtns = document.querySelectorAll("[href='#menu-calculator'");

    //!<Dropdowns>=================================================================================================

    //*<City>=================================================================================================

    const cityCurrent = document.querySelector(".city__current"),
        header = document.querySelector(".header");

    if (cityCurrent != undefined) {
        cityCurrent.addEventListener("click", () => {
            cityCurrent.classList.toggle("active");

            cityCurrent.nextElementSibling.classList.toggle("active");
            if (document.documentElement.clientWidth < 576) {
                overlay.classList.toggle("active");
                body.classList.toggle("lock");
                header.classList.toggle("showcity");
            }
        });
    }

    //*</City>=================================================================================================

    //*<Selector Menu Calculator>=================================================================================================

    const selectorsKidsBtns = document.querySelectorAll(".selector__button[data-selector='kids']"),
        selectorsBalanceBtns = document.querySelectorAll(".selector__button[data-selector='balance']"),
        selectorsPregnantBtns = document.querySelectorAll(".selector__button[data-selector='pregnant']");

    function addEventToSelector(selectors) {
        selectors.forEach((selector, i) => {
            const selectorList = selector.nextElementSibling,
                selectorListItems = selectorList.querySelectorAll("li"),
                selectorInput = selectorList.nextElementSibling;

            selector.addEventListener("click", (e) => {
                selector.classList.toggle("active");
                selectorList.classList.toggle("active");
            });

            selectorListItems.forEach((item, i) => {
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const itemHtml = item.innerHTML,
                        itemText = item.textContent,
                        itemDays = parseInt(item.querySelector("span").textContent),
                        tabsMenus = document.querySelectorAll(".tab-menus");

                    addDisableOnTabsMenus(tabsMenus, itemDays);

                    selector.innerHTML = itemHtml;
                    selectorInput.setAttribute("value", itemText);
                    selectorList.classList.remove("active");
                    selector.classList.remove("active");
                    calculationPrice();
                });
            });
        });
    }

    function addDisableOnTabsMenus(tabs, days) {
        if (days > 6) {
            tabs.forEach((item) => {
                item.classList.remove("disable");
            });
            return;
        }

        tabs.forEach((item) => {
            item.classList.add("disable");
        });

        for (let i = 0; i < days; i++) {
            if (i == 0) {
                tabs[i].click();
            }
            tabs[i].classList.remove("disable");
        }
    }

    addEventToSelector(selectorsKidsBtns);
    addEventToSelector(selectorsBalanceBtns);
    addEventToSelector(selectorsPregnantBtns);

    //*</Selector Menu Calculator>=================================================================================================

    //*<Order interval>=================================================================================================

    const orderInterval = document.querySelector(".order__interval button");

    if (document.documentElement.clientWidth > 768 && orderInterval != undefined) {
        orderInterval.addEventListener("click", (e) => {
            e.preventDefault();
            const intervalList = orderInterval.nextElementSibling,
                intervalListItems = intervalList.querySelectorAll("li"),
                intervalInput = intervalList.nextElementSibling;

            orderInterval.classList.toggle("active");
            intervalList.classList.toggle("active");

            intervalListItems.forEach((item, i) => {
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const itemHtml = item.innerHTML,
                        itemText = item.textContent;
                    orderInterval.innerHTML = itemHtml;
                    intervalInput.setAttribute("value", itemText);
                    intervalList.classList.remove("active");
                    orderInterval.classList.remove("active");
                    calculationPrice();
                });
            });
        });
    }

    //*</Order interval>=================================================================================================

    //!</Dropdowns>=================================================================================================

    //*!<Tabs>=================================================================================================

    //*<Step tabs>=================================================================================================

    const stepKidsTabs = document.querySelectorAll(".step__tabs.kids button"),
        stepBalanceTabs = document.querySelectorAll(".step__tabs.balance button"),
        stepPregnantTabs = document.querySelectorAll(".step__tabs.pregnant button"),
        stepMotherTabs = document.querySelectorAll(".step__tabs.mother button");

    function addEventToStepTabs(tabs) {
        tabs.forEach((tab, i) => {
            tab.addEventListener("click", (e) => {
                const tabParent = tab.parentElement,
                    calendar = tabParent.previousElementSibling,
                    selector = calendar.previousElementSibling;

                let selectorDays;

                tab.classList.add("active");

                if (i == 0) {
                    tabParent.classList.remove("active");
                    selector.classList.add("active");
                    calendar.classList.remove("active");
                    menuProgramms.forEach((programm) => {
                        if (programm.classList.contains("active")) {
                            selectorDays = parseInt(programm.querySelector('.selector__button[data-button="day"] span').textContent);
                        }
                    });
                    addDisableOnTabsMenus(tabsMenus, selectorDays);
                } else {
                    tabParent.classList.add("active");
                    selector.classList.remove("active");
                    calendar.classList.add("active");
                    tabsMenus.forEach((item) => {
                        item.classList.remove("disable");
                    });
                }

                tabs.forEach((item) => {
                    if (item != tab) {
                        item.classList.remove("active");
                    }
                });

                calculationPrice();
            });
        });
    }

    if (stepKidsTabs != undefined) {
        addEventToStepTabs(stepKidsTabs);
    }
    if (stepBalanceTabs != undefined) {
        addEventToStepTabs(stepBalanceTabs);
    }
    if (stepPregnantTabs != undefined) {
        addEventToStepTabs(stepPregnantTabs);
    }
    if (stepMotherTabs != undefined) {
        addEventToStepTabs(stepMotherTabs);
    }

    //*</Step tabs>=================================================================================================

    //*<Mainscreen tabs>=================================================================================================

    const mainscreenTabs = document.querySelectorAll(".slider-tabs__slide");

    if (mainscreenTabs.length > 0) {
        mainscreenTabs.forEach((item, i) => {
            item.addEventListener("click", (e) => {
                swiperMain.slideTo(i);
                swiperMain.autoplay.start();
            });
        });
    }

    //*</Mainscreen tabs>=================================================================================================

    //*<Menus tabs>=================================================================================================

    let menusTabs = document.querySelectorAll(".tab-menus"),
        menusTabcontent = document.querySelectorAll(".menus__tabcontent");

    if (menusTabs != undefined) {
        menusTabs.forEach((item, i, arrTabs) => {
            item.addEventListener("click", (e) => {
                if (!item.classList.contains("active")) {
                    showTabcontent(item, i, arrTabs, menusTabcontent);
                }
            });
        });
    }

    //*</Menus tabs>=================================================================================================

    //*<Article tabcontent>=================================================================================================

    const articlesTabs = document.querySelectorAll(".articles__tabs ul li"),
        articlesTabcontent = document.querySelectorAll(".articles__tabcontent");

    if (articlesTabs != undefined) {
        articlesTabs.forEach((item, i, arrTabs) => {
            item.addEventListener("click", (e) => {
                if (!item.classList.contains("active")) {
                    showTabcontent(item, i, arrTabs, articlesTabcontent);
                }
            });
        });
    }

    //*</Article tabcontent>=================================================================================================

    //*<Tabs faq>=================================================================================================

    let faqTabs = document.querySelectorAll(".faq-tab"),
        faqTabcontent = document.querySelectorAll(".faq__tabcontent");

    function showFaqTabcontent(item, i) {
        item.classList.add("active");
        faqTabcontent[i].classList.add("active");
        faqTabs.forEach((tab, j) => {
            if (i != j) {
                tab.classList.remove("active");
            }
        });
        faqTabcontent.forEach((tabcontent, e) => {
            if (i != e) {
                tabcontent.classList.remove("active");
            }
        });
    }

    if (faqTabs != undefined) {
        faqTabs.forEach((item, i) => {
            item.addEventListener("click", (e) => {
                if (!item.classList.contains("active")) {
                    showFaqTabcontent(item, i);
                }
            });
        });
    }

    //*</Tabs faq>=================================================================================================

    //?==============<Function "Show tabcontent">==============

    function showTabcontent(item, i, arrTabs, arrTabcontent) {
        item.classList.add("active");
        arrTabcontent[i].classList.add("active");

        arrTabs.forEach((tab, j) => {
            if (i != j) {
                tab.classList.remove("active");
            }
        });

        arrTabcontent.forEach((tabcontent, j) => {
            if (i != j) {
                tabcontent.classList.remove("active");
            }
        });
    }

    //?==============</Function "Show tabcontent">=============

    //*!</Tabs>=================================================================================================

    //!<Calendars>=================================================================================================

    //?==============<Buttons>==============

    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
        daysOfTheWeekShort = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        tabsMenus = document.querySelectorAll(".tab-menus"),
        menusDate = document.querySelector("#menus-date");

    function addZero(number) {
        if (number < 10) {
            return (number = `0${number}`);
        } else {
            return number;
        }
    }

    function changeDatesInMenusTabs(tabs, date) {
        let currentDate = date;

        tabs.forEach((tab, i) => {
            const tabDayName = tab.querySelector("span"),
                tabDate = tab.querySelector("p");

            let day = currentDate.getDate(),
                month = addZero(currentDate.getMonth()),
                dayName = daysOfTheWeekShort[currentDate.getDay()];

            tabDayName.textContent = dayName;
            tabDate.textContent = `${day}.${month}`;

            currentDate = new Date(getTommorow(currentDate));
        });
    }

    function getTommorow(date, days = 1) {
        return date.getTime() + 24 * 60 * 60 * 1000 * days;
    }

    function changeDatesMenus(date) {
        let menusDateValue = menusDate.value.split(" ");

        months.forEach((item, i) => {
            if (item.toLowerCase().slice(0, 3) == menusDateValue[1].toLowerCase().slice(0, 3)) {
                menusDate.value = `${menusDateValue[0]} ${item.toLowerCase()}`;
                return;
            }
            if (menusDateValue[1].toLowerCase().slice(0, 3) == "май") {
                menusDate.value = `${menusDateValue[0]} мая`;
            }
        });

        changeDatesInMenusTabs(tabsMenus, date);
    }

    let button = {
        content: "Выбрать",
        className: "air-datepicker__btn air-datepicker__btn_menu btn",
        onClick: (calendar, date) => {
            calendar.hide();
            if (document.documentElement.clientWidth < 768) {
                header.classList.remove("popup");
            }
        },
    };

    let buttonOrder = {
        content: "Выбрать",
        className: "air-datepicker__btn btn",
        onClick: (calendar) => {
            calendar.hide();
        },
    };

    let buttonStep = {
        content: "Выбрать",
        className: "air-datepicker__btn btn",
        onClick: (calendar) => {
            calendar.hide();
            if (document.documentElement.clientWidth < 768) {
                header.classList.remove("popup");
            }
            calculationPrice();
        },
    };

    //?==============</Buttons>=============

    let calendarBalanceNode = document.getElementById("calendar-balance"),
        calendarKidsNode = document.getElementById("calendar-kids"),
        calendarPregnantNode = document.getElementById("calendar-pregnant"),
        calendarMotherNode = document.getElementById("calendar-mother"),
        orderCalendarNode = document.getElementById("order-calendar"),
        calendarMenusNode = document.getElementById("menus-date"),
        calendarBalance,
        calendarMother,
        calendarKids,
        calendarPregnant,
        orderCalendar,
        orderCalendarBtn = document.querySelector(".order__date label"),
        calendarMenu,
        calendarMenuBtn = document.querySelector(".menus__date"),
        calendarsBtn = document.querySelectorAll(".calendar__change");

    if (calendarBalanceNode != undefined) {
        calendarBalance = new AirDatepicker(calendarBalanceNode, {
            range: true,
            dynamicRange: true,
            porition: "top center",
            dateFormat: "dd/MM",
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [buttonStep],
        });
    }

    if (calendarMotherNode != undefined) {
        calendarMother = new AirDatepicker(calendarMotherNode, {
            range: true,
            dynamicRange: true,
            porition: "top center",
            dateFormat: "dd/MM",
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [buttonStep],
        });
    }

    if (calendarKidsNode != undefined) {
        calendarKids = new AirDatepicker(calendarKidsNode, {
            range: true,
            dynamicRange: true,
            porition: "top center",
            dateFormat: "dd/MM",
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [buttonStep],
        });
    }

    if (calendarPregnantNode != undefined) {
        calendarPregnant = new AirDatepicker(calendarPregnantNode, {
            range: true,
            autoClose: false,
            dynamicRange: true,
            porition: "top center",
            dateFormat: "dd/MM",
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [buttonStep],
        });
    }

    if (calendarsBtn != undefined) {
        calendarsBtn.forEach((btn, i) => {
            btn.addEventListener("click", (e) => {
                if (i == 0) {
                    calendarBalance.show();
                } else if (i == 1) {
                    calendarPregnant.show();
                } else if (i == 2) {
                    calendarKids.show();
                } else {
                    calendarMother.show();
                }
                if (document.documentElement.clientWidth < 768) {
                    header.classList.add("popup");
                }
                const calendarPoint = document.querySelector(".air-datepicker--pointer");

                if (calendarPoint != undefined) {
                    calendarPoint.textContent = "Выберите даты";
                }
            });
        });
    }

    //*<Order calendar>=================================================================================================

    if (orderCalendarNode != undefined) {
        orderCalendar = new AirDatepicker(orderCalendarNode, {
            classes: "order",
            isMobile: true,
            autoClose: false,
            position: "bottom left",
            dateFormat: "d MMMM",
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [buttonOrder],
        });
    }

    if (orderCalendarBtn != undefined) {
        orderCalendarBtn.addEventListener("click", (e) => {
            e.preventDefault();
            orderCalendar.show();
            const calendarPoint = document.querySelector(".air-datepicker--pointer");
            if (calendarPoint != undefined) {
                calendarPoint.textContent = "Выберите дату начала";
            }
        });
    }

    //*</Order calendar>=================================================================================================

    //*<Menus calendar>=================================================================================================

    if (calendarMenusNode != undefined) {
        calendarMenu = new AirDatepicker(calendarMenusNode, {
            classes: "menu",
            position: "bottom left",
            dateFormat: "d MMMM",
            autoClose: false,
            minDate: new Date(),
            navTitles: {
                days: "MMMM yyyy",
                months: "yyyy",
                years: "yyyy1 - yyyy2",
            },
            multipleDatesSeparator: " - ",
            buttons: [button],
            onSelect: ({ date, formattedDate, datepicker }) => {
                changeDatesMenus(date);
            },
        });
    }

    if (calendarMenuBtn != undefined) {
        calendarMenuBtn.addEventListener("click", (e) => {
            e.preventDefault();
            calendarMenu.show();

            const calendarPoint = document.querySelector(".air-datepicker--pointer");
            if (document.documentElement.clientWidth < 768) {
                header.classList.add("popup");
            }
            if (calendarPoint != undefined) {
                calendarPoint.textContent = "Выберите дату начала";
            }
        });
    }

    //*</Menus calendar>=================================================================================================

    //*<Datepicker overlay>=================================================================================================

    const datepickerOverlay = document.querySelector(".air-datepicker-overlay");

    if (datepickerOverlay != undefined) {
        datepickerOverlay.addEventListener("click", (e) => {
            header.classList.remove("popup");
        });
    }

    //*</Datepicker overlay>=================================================================================================

    //?==============<Adaptive calendars>==============

    if (document.documentElement.clientWidth < 992) {
        if (calendarMenu != undefined) {
            calendarMenu.update({
                position: "bottom right",
            });
        }
    }

    if (document.documentElement.clientWidth < 768) {
        if (calendarMenu != undefined) {
            calendarMenu.update({
                isMobile: true,
            });
        }
        if (calendarPregnant != undefined) {
            calendarPregnant.update({
                isMobile: true,
            });
        }
        if (calendarMother != undefined) {
            calendarMother.update({
                isMobile: true,
            });
        }
        if (calendarKids != undefined) {
            calendarKids.update({
                isMobile: true,
            });
        }
        if (calendarBalance != undefined) {
            calendarBalance.update({
                isMobile: true,
            });
        }
    }

    //?==============</Adaptive calendars>==============

    //!</Calendars>=================================================================================================

    //!<Calculators>=================================================================================================

    //*<Calculator>=================================================================================================

    //?==============<Calculator item>==============

    const calculator = document.querySelector("[data-calculator]"),
        calculatorError = document.querySelector(".item-calculator__error");

    //?==============</Calculator item>=============

    //?==============<Items>==============

    const itemTrimmom = document.querySelector(".item-calculator_trimmom"),
        itemTarget = document.querySelector(".item-calculator_target"),
        itemGender = document.querySelector(".item-calculator_gender"),
        trimmomSelector = document.querySelector(".item-calculator_trimmom-selector"),
        targetSelector = document.querySelector(".item-calculator_target-selector"),
        activitySelector = document.querySelector(".item-calculator_activity-selector");

    //?==============</Items>=============

    //?==============<Validation inputs>==============

    const inputs = document.querySelectorAll('.item-calculator input[type="text"]');

    if (inputs != undefined) {
        inputs.forEach((input) => {
            input.addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/[^\d]/g, "");
            });
        });
    }

    //?==============</Validation inputs>=============

    //?==============<Pregnant checkbox>==============

    const calculatorPregnantCheckbox = document.querySelector(".calculator__checkbox input");

    function showPregnancyElement() {
        calculation(age.value, height.value, weight.value);
        calculationPrice();
        if (document.documentElement.clientWidth > 576) {
            if (calculatorPregnantCheckbox.checked) {
                itemTrimmom.classList.remove("hidden");
                itemTarget.classList.add("hidden");
                itemGender.classList.add("hidden");
            } else {
                itemTrimmom.classList.add("hidden");
                itemTarget.classList.remove("hidden");
                itemGender.classList.remove("hidden");
            }
        } else {
            if (calculatorPregnantCheckbox.checked) {
                trimmomSelector.classList.remove("hidden");
                targetSelector.classList.add("hidden");
                itemGender.classList.add("hidden");
            } else {
                trimmomSelector.classList.add("hidden");
                targetSelector.classList.remove("hidden");
                itemGender.classList.remove("hidden");
            }
        }
    }

    if (calculatorPregnantCheckbox != undefined) {
        calculatorPregnantCheckbox.addEventListener("click", showPregnancyElement);
    }

    //?==============</Pregnant checkbox>=============

    //?==============<Text inputs>==============

    const age = document.getElementById("age"),
        weight = document.getElementById("weight"),
        height = document.getElementById("height");

    //?==============</Text inputs>=============

    //?==============<Checkboxes and selectors>==============

    const radioActivities = document.querySelectorAll("input[name='activity']"),
        radioTargets = document.querySelectorAll("input[name='target']"),
        radioGenders = document.querySelectorAll("input[name='gender']"),
        radioTrimmoms = document.querySelectorAll("input[name='trimmom']"),
        selectorActivityInput = document.querySelector(".item-calculator_activity-selector input"),
        selectorTargetInput = document.querySelector(".item-calculator_target-selector input"),
        selectorTrimmomInput = document.querySelector(".item-calculator_trimmom-selector input"),
        trimmomSelectorBtn = document.querySelector(".item-calculator_trimmom-selector button"),
        targetSelectorBtn = document.querySelector(".item-calculator_target-selector button"),
        activitySelectorBtn = document.querySelector(".item-calculator_activity-selector button");

    //?==============</Checkboxes and selectors>=============

    //?==============<Result values>==============

    const programm = document.getElementById("programm-name"),
        callories = document.querySelector("[data-calculator='calories']"),
        programmCallories = document.getElementById("programm-callories");

    //?==============</Result values>=============

    //?==============<Programms>==============

    programmBtns.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            if (btn.dataset.programm == "balance") {
                menuProgramms.forEach((programm, i) => {
                    if (programm.classList.contains("menu-programm_balance")) {
                        showMenuProgramm(programm, i, menuProgramms);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_balance")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                return;
            }
            if (btn.dataset.programm == "pregnant") {
                menuProgramms.forEach((programm, i) => {
                    if (programm.classList.contains("menu-programm_pregnant")) {
                        showMenuProgramm(programm, i, menuProgramms);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_pregnant")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                return;
            }
            if (btn.dataset.programm == "individual") {
                menuProgramms.forEach((programm, i) => {
                    if (programm.classList.contains("menu-programm_individual")) {
                        showMenuProgramm(programm, i, menuProgramms);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_individual")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                return;
            }
            if (btn.dataset.programm == "mother") {
                menuProgramms.forEach((programm, i) => {
                    if (programm.classList.contains("menu-programm_mother")) {
                        showMenuProgramm(programm, i, menuProgramms);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_mother")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                return;
            }
            if (btn.dataset.programm == "kids") {
                menuProgramms.forEach((programm, i) => {
                    if (programm.classList.contains("menu-programm_kids")) {
                        showMenuProgramm(programm, i, menuProgramms);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_kids")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                return;
            }
        });
    });

    //?==============</Programms>=============

    //?==============<Show menu programm>==============

    function showMenuProgramm(programm, i, array) {
        programm.classList.add("active");
        array.forEach((item, j) => {
            if (i != j) {
                item.classList.remove("active");
            }
        });
        if (programm.classList.contains("menu-programm" && !programm.classList.contains("menu-programm_individual"))) {
            const selectorDays = parseInt(programm.querySelector('.selector__button[data-button="day"] span').textContent);
            addDisableOnTabsMenus(tabsMenus, selectorDays);
        }
    }

    //?==============</Show menu programm>=============

    //?==============<Objects>==============

    const activitiesObj = [
        {
            activity: "low",
            A: 1.375,
        },
        {
            activity: "middle",
            A: 1.55,
        },
        {
            activity: "height",
            A: 1.725,
        },
    ];

    const targetsObj = [
        {
            target: "slim",
            percent: 0.8,
        },
        {
            target: "support",
            percent: 1,
        },
        {
            target: "gain",
            percent: 1.2,
        },
    ];

    const trimmomObj = [
        {
            trimmom: "first",
            callories: 100,
        },
        {
            trimmom: "second",
            callories: 200,
        },
        {
            trimmom: "third",
            callories: 300,
        },
    ];

    //?==============</Objects>=============

    //?==============<Main variables>==============

    let currentTargetPercent = targetsObj[0].percent,
        currentActivityA = activitiesObj[0].A,
        currentTrimmomCallories = trimmomObj[0].callories;

    //?==============</Main variables>=============

    //?==============<Radios events>==============

    radioActivities.forEach((item, i) => {
        item.addEventListener("input", (e) => {
            const dataAttrValue = item.dataset.activity;
            const currentActivity = activitiesObj.find((activity) => activity.activity === dataAttrValue);
            currentActivityA = currentActivity.A;
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    });

    radioTrimmoms.forEach((item, i) => {
        item.addEventListener("input", (e) => {
            const dataAttrValue = item.dataset.trimmom;
            const currentTrimmom = trimmomObj.find((trimmom) => trimmom.trimmom === dataAttrValue);
            currentTrimmomCallories = currentTrimmom.callories;
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    });

    radioTargets.forEach((item, i) => {
        item.addEventListener("input", (e) => {
            const dataAttrValue = item.dataset.target;
            const currentTarget = targetsObj.find((target) => target.target === dataAttrValue);
            currentTargetPercent = currentTarget.percent;
            calculationPrice();
            calculation(age.value, height.value, weight.value);
        });
    });

    radioGenders.forEach((item, i) => {
        item.addEventListener("input", (e) => {
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    });

    //?==============</Radios events>=============

    //?==============<Text inputs events>==============

    if (age != undefined) {
        age.addEventListener("input", (e) => {
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    }

    if (height != undefined) {
        height.addEventListener("input", (e) => {
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    }

    if (weight != undefined) {
        weight.addEventListener("input", (e) => {
            calculation(age.value, height.value, weight.value);
            calculationPrice();
        });
    }

    //?==============</Text inputs events>=============

    //?==============<Selectors>==============

    function changeValueSelectors(selector) {
        if (selector != undefined) {
            const selectorList = selector.nextElementSibling,
                selectorListItems = selectorList.querySelectorAll("li"),
                selectorInput = selectorList.nextElementSibling;

            selectorListItems.forEach((item, i) => {
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const itemHtml = item.innerHTML,
                        selectorHtml = selector.innerHTML;

                    let itemText = item.textContent;

                    if (item.parentNode.parentNode.classList.contains("calculator-selector_activity")) {
                        itemText = item.querySelector("div span").textContent;
                    }
                    item.innerHTML = selectorHtml;
                    selector.innerHTML = itemHtml;
                    selectorInput.setAttribute("value", itemText);

                    if (selectorActivityInput.value == "Низкий") {
                        currentActivityA = activitiesObj[0].A;
                    }
                    if (selectorActivityInput.value == "Средний") {
                        currentActivityA = activitiesObj[1].A;
                    }
                    if (selectorActivityInput.value == "Высокий") {
                        currentActivityA = activitiesObj[2].A;
                    }

                    if (selectorTargetInput.value == "Похудеть") {
                        currentTargetPercent = targetsObj[0].percent;
                    }
                    if (selectorTargetInput.value == "Поддержать вес") {
                        currentTargetPercent = targetsObj[1].percent;
                    }
                    if (selectorTargetInput.value == "Набрать вес") {
                        currentTargetPercent = targetsObj[2].percent;
                    }

                    if (selectorTrimmomInput.value == "1 тримместр") {
                        currentTrimmomCallories = trimmomObj[0].callories;
                    }
                    if (selectorTrimmomInput.value == "2 тримместр") {
                        currentTrimmomCallories = trimmomObj[1].callories;
                    }
                    if (selectorTrimmomInput.value == "3 тримместр") {
                        currentTrimmomCallories = trimmomObj[2].callories;
                    }

                    calculation(age.value, height.value, weight.value);
                    calculationPrice();
                });
            });
        }
    }

    changeValueSelectors(trimmomSelectorBtn);
    changeValueSelectors(targetSelectorBtn);
    changeValueSelectors(activitySelectorBtn);
    // changeValueSelectors(trimmomSelectorBtn);

    //?==============</Selectors>=============

    //?==============<Check inputs>==============

    function checkInputs() {
        return (
            age.value !== "" &&
            weight.value !== "" &&
            height.value !== "" &&
            (radioTargets[0].checked == true || radioTargets[1].checked == true || radioTargets[2].checked == true) &&
            (radioActivities[0].checked == true || radioActivities[1].checked == true || radioActivities[2].checked == true)
        );
    }

    function checkInputsPregnant() {
        return (
            age.value !== "" &&
            weight.value !== "" &&
            height.value !== "" &&
            (radioTrimmoms[0].checked == true || radioTrimmoms[1].checked == true || radioTrimmoms[2].checked == true) &&
            (radioActivities[0].checked == true || radioActivities[1].checked == true || radioActivities[2].checked == true)
        );
    }

    //?==============</Check inputs>=============

    //?==============<Function calculation>==============

    function calculation(age, height, weight) {
        let calloriesCount,
            A = currentActivityA;

        if (calculatorPregnantCheckbox.checked) {
            programm.innerHTML = "Питание для беременных";
            radioGenders[1].checked = true;
            currentTargetPercent = 1;
            radioGenders.forEach((gender) => {
                if (radioGenders[1] != gender) {
                    radioGenders.checked = false;
                }
            });
        } else {
            programm.innerHTML = "Сбалансированное питание";
        }

        if (!radioGenders[0].checked && !radioGenders[1].checked) {
            calculatorError.classList.add("active");
            return;
        }

        if (radioGenders[0].checked) {
            calculatorError.classList.remove("active");
            if (document.documentElement.clientWidth > 576) {
                if (checkInputs()) {
                    calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age + 5) * A);
                    callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
                } else {
                    return;
                }
            } else if (age !== "" && weight !== "" && height !== "") {
                calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age + 5) * A);
                callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
            }
        }

        if (radioGenders[1].checked) {
            calculatorError.classList.remove("active");
            if (document.documentElement.clientWidth > 576) {
                if (calculatorPregnantCheckbox.checked) {
                    if (checkInputsPregnant()) {
                        calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age - 161 + currentTrimmomCallories) * A);
                        callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
                    } else {
                        return;
                    }
                } else {
                    if (checkInputs()) {
                        calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age - 161) * A);
                        callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
                        calculatorError.classList.remove("active");
                    } else {
                        return;
                    }
                }
            } else if (age !== "" && weight !== "" && height !== "") {
                if (calculatorPregnantCheckbox.checked) {
                    calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age - 161 + currentTrimmomCallories) * A);
                    callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
                } else {
                    calloriesCount = Math.floor((10 * weight + 6.25 * height - 5 * age - 161) * A);
                    callories.textContent = Math.floor(calloriesCount * currentTargetPercent);
                }
            }
        }

        let calloriesValue = +callories.textContent;

        if (calculator.dataset.calculator == "all") {
            if (age > 12 && !calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Сбалансированное питание";

                //! Programm callories

                if (calloriesValue >= 2100) {
                    programmCallories.textContent = 2500;
                } else if (calloriesValue >= 1800) {
                    programmCallories.textContent = 2100;
                } else if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1800;
                } else if (calloriesValue >= 1200) {
                    programmCallories.textContent = 1500;
                } else if (calloriesValue >= 900) {
                    programmCallories.textContent = 1200;
                } else {
                    programmCallories.textContent = 900;
                }

                //!

                menuProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("menu-programm_balance")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_balance")) {
                        showMenuProgramm(programm, i, array);
                    }
                });

                selectorsBalanceBtns[0].innerHTML = `<span>${calloriesCount} <span>ккал</span></span>`;
            } else if (age <= 12 && !calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Детское питание";

                //! Programm callories

                if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1800;
                } else if (calloriesValue >= 1200) {
                    programmCallories.textContent = 1500;
                } else {
                    programmCallories.textContent = 1200;
                }

                //!

                menuProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("menu-programm_kids")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_kids")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
            } else if (calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Питание для беременных";

                //! Programm callories

                if (calloriesValue >= 2300) {
                    programmCallories.textContent = 2500;
                } else if (calloriesValue >= 2100) {
                    programmCallories.textContent = 2300;
                } else if (calloriesValue >= 1900) {
                    programmCallories.textContent = 2100;
                } else if (calloriesValue >= 1700) {
                    programmCallories.textContent = 1900;
                } else if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1700;
                } else {
                    programmCallories.textContent = 1500;
                }

                //!

                menuProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("menu-programm_pregnant")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_pregnant")) {
                        showMenuProgramm(programm, i, array);
                    }
                });

                selectorsPregnantBtns[0].innerHTML = `<span>${calloriesCount} <span>ккал</span></span>`;
            } else {
                programm.innerHTML = "Индивидуальное питание";
                programmCallories.textContent = "Индивидуально";
                menuProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("menu-programm_individual")) {
                        showMenuProgramm(programm, i, array);
                    }
                });

                resultProgramms.forEach((programm, i, array) => {
                    if (programm.classList.contains("result-programm_individual")) {
                        showMenuProgramm(programm, i, array);
                    }
                });
            }
        } else {
            if (age > 12 && !calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Сбалансированное питание";

                if (calloriesValue >= 2100) {
                    programmCallories.textContent = 2500;
                } else if (calloriesValue >= 1800) {
                    programmCallories.textContent = 2100;
                } else if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1800;
                } else if (calloriesValue >= 1200) {
                    programmCallories.textContent = 1500;
                } else if (calloriesValue >= 900) {
                    programmCallories.textContent = 1200;
                } else {
                    programmCallories.textContent = 900;
                }
            } else if (age <= 12 && !calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Детское питание";

                if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1800;
                } else if (calloriesValue >= 1200) {
                    programmCallories.textContent = 1500;
                } else {
                    programmCallories.textContent = 1200;
                }
            } else if (calculatorPregnantCheckbox.checked) {
                programm.innerHTML = "Питание для беременных";

                //! Programm callories

                if (calloriesValue >= 2300) {
                    programmCallories.textContent = 2500;
                } else if (calloriesValue >= 2100) {
                    programmCallories.textContent = 2300;
                } else if (calloriesValue >= 1900) {
                    programmCallories.textContent = 2100;
                } else if (calloriesValue >= 1700) {
                    programmCallories.textContent = 1900;
                } else if (calloriesValue >= 1500) {
                    programmCallories.textContent = 1700;
                } else {
                    programmCallories.textContent = 1500;
                }
            } else {
                programm.innerHTML = "Индивидуальное питание";
                programmCallories.textContent = "Индивидуально";
            }
        }
    }

    //?==============</Function calculation>=============

    //?==============<Calculator reset>==============

    const calculatorRest = document.querySelector(".calculator__reset");

    if (calculatorRest != undefined) {
        calculatorRest.addEventListener("click", (e) => {
            age.value = "";
            height.value = "";
            weight.value = "";
            callories.textContent = 0;
            if (calculatorPregnantCheckbox.checked) {
                calculatorPregnantCheckbox.click();
            }
            radioGenders.forEach((item) => {
                item.checked = false;
            });
            radioActivities.forEach((item, i) => {
                item.checked = false;
            });

            radioTrimmoms.forEach((item, i) => {
                item.checked = false;
            });

            radioTargets.forEach((item, i) => {
                item.checked = false;
            });
            calculation(+age.value, +height.value, +weight.value);
            calculatorError.classList.remove("active");
            programm.innerHTML = "Сбалансированное питание";
            menuProgramms.forEach((programm, i, array) => {
                if (programm.classList.contains("menu-programm_balance")) {
                    showMenuProgramm(programm, i, array);
                }
            });
            resultProgramms.forEach((programm, i, array) => {
                if (programm.classList.contains("result-programm_balance")) {
                    showMenuProgramm(programm, i, array);
                }
            });
            selectorsBalanceBtns[0].innerHTML = `<span>${900} <span>ккал</span></span>`;
        });
    }

    //?==============</Calculator reset>=============

    //*</Calculator>=================================================================================================

    //*<Price calculator>=================================================================================================

    const selectorCallories = document.querySelectorAll("[data-button='selector']"),
        days = document.querySelectorAll("[data-button='day']");

    //?==============<Result values>==============

    const calloriesCounts = document.querySelectorAll(".step__calloriescount"),
        dailyPrice = document.querySelectorAll(".step__dailyprice"),
        price = document.querySelectorAll(".step__price"),
        menuCalculatorDays = document.querySelectorAll('[data-menucalculator="days"]'),
        resultPrices = document.querySelectorAll(".result-price"),
        resultDays = document.querySelectorAll(['[data-result="days"]']),
        resultDailyPrice = document.querySelectorAll('[data-result="dailyPrice"]'),
        calendarInputs = document.querySelectorAll(".calendar__calendar input"),
        calendarsCount = document.querySelectorAll(".calendar__count");

    //?==============</Result values>=============

    function calculationPrice() {
        calloriesCounts.forEach((item, i) => {
            if (selectorCallories[i].getAttribute("data-selector") == "kids") {
                item.innerHTML = selectorCallories[i].querySelector("#kids-callories").innerHTML;
            } else {
                item.innerHTML = selectorCallories[i].innerHTML;
            }
        });

        dailyPrice.forEach((item, i) => {
            item.innerHTML = days[i].innerHTML;
        });

        price.forEach((item, i) => {
            if (calculator.dataset.calculator == "all") {
                if (
                    stepKidsTabs[1].classList.contains("active") ||
                    stepBalanceTabs[1].classList.contains("active") ||
                    stepMotherTabs[1].classList.contains("active") ||
                    stepPregnantTabs[1].classList.contains("active")
                ) {
                    if (calendarInputs[i].value !== "") {
                        let firstDay,
                            secondDay,
                            day,
                            counter,
                            currentMonth,
                            balanceDates = calendarBalance.selectedDates,
                            kidsDates = calendarKids.selectedDates,
                            motherDates = calendarMother.selectedDates,
                            pregnantDates = calendarPregnant.selectedDates;

                        const dailyPriceSpans = dailyPrice[i].querySelectorAll("span");

                        if (balanceDates.length > 1 || kidsDates.length > 1 || pregnantDates.length > 1 || motherDates.length > 1) {
                            menuProgramms.forEach((programm, i) => {
                                if (programm.classList.contains("menu-programm_balance") && programm.classList.contains("active")) {
                                    firstDay = balanceDates[0].getDate();
                                    secondDay = balanceDates[1].getDate();
                                    currentMonth = balanceDates[0].getMonth();
                                    day = Math.ceil((balanceDates[1] - balanceDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                }
                                if (programm.classList.contains("menu-programm_kids") && programm.classList.contains("active")) {
                                    firstDay = kidsDates[0].getDate();
                                    secondDay = kidsDates[1].getDate();
                                    currentMonth = kidsDates[0].getMonth();
                                    day = Math.ceil((kidsDates[1] - kidsDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                }
                                if (programm.classList.contains("menu-programm_pregnant") && programm.classList.contains("active")) {
                                    firstDay = pregnantDates[0].getDate();
                                    secondDay = pregnantDates[1].getDate();
                                    currentMonth = pregnantDates[0].getMonth();
                                    day = Math.ceil((pregnantDates[1] - pregnantDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                }
                                if (programm.classList.contains("menu-programm_mother") && programm.classList.contains("active")) {
                                    firstDay = motherDates[0].getDate();
                                    secondDay = motherDates[1].getDate();
                                    currentMonth = motherDates[0].getMonth();
                                    day = Math.ceil((motherDates[1] - motherDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                }
                            });

                            //! 	Связь дат

                            months.forEach((item, i) => {
                                if (i == currentMonth) {
                                    menusDate.value = `${firstDay} ${item}`;
                                }
                            });

                            //!

                            if (day == 1 || day == 21 || day == 31) {
                                calendarsCount[i].innerHTML = `${day} <span>день</span>`;
                                dailyPriceSpans[0].innerHTML = `${day} <span>день</span>`;
                                resultDays[i].textContent = `${day} день`;
                                menuCalculatorDays[i].textContent = `${day} день`;
                            } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                                calendarsCount[i].innerHTML = `${day} <span>дня</span>`;
                                dailyPriceSpans[0].innerHTML = `${day} <span>дня</span>`;
                                resultDays[i].textContent = `${day} дня`;
                                menuCalculatorDays[i].textContent = `${day} дня`;
                            } else {
                                calendarsCount[i].innerHTML = `${day} <span>дней</span>`;
                                dailyPriceSpans[0].innerHTML = `${day} <span>дней</span>`;
                                resultDays[i].textContent = `${day} дней`;
                                menuCalculatorDays[i].textContent = `${day} дней`;
                            }

                            counter = day * parseInt(dailyPriceSpans[2].textContent);

                            item.textContent = `${counter} ₽`;
                            resultPrices[i].textContent = `${counter} ₽`;
                            menuProgramms.forEach((programm, i) => {
                                if (programm.classList.contains("menu-programm_balance") && programm.classList.contains("active")) {
                                    changeDatesMenus(balanceDates[0]);
                                }
                                if (programm.classList.contains("menu-programm_kids") && programm.classList.contains("active")) {
                                    changeDatesMenus(kidsDates[0]);
                                }
                                if (programm.classList.contains("menu-programm_pregnant") && programm.classList.contains("active")) {
                                    changeDatesMenus(pregnantDates[0]);
                                }
                                if (programm.classList.contains("menu-programm_mother") && programm.classList.contains("active")) {
                                    changeDatesMenus(motherDates[0]);
                                }
                            });
                        }
                    }
                } else {
                    const spansDay = days[i].querySelectorAll("span");
                    let counter = 1,
                        day = parseInt(spansDay[0].textContent),
                        dailyPrice = parseInt(spansDay[2].textContent);

                    spansDay.forEach((item) => {
                        let number = parseInt(item.textContent);
                        if (!isNaN(number)) {
                            counter *= number;
                        }
                    });

                    if (day == 1 || day == 21 || day == 31) {
                        resultDays[i].textContent = `${day} день`;
                        menuCalculatorDays[i].textContent = `${day} день`;
                    } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                        resultDays[i].textContent = `${day} дня`;
                        menuCalculatorDays[i].textContent = `${day} дня`;
                    } else {
                        resultDays[i].textContent = `${day} дней`;
                        menuCalculatorDays[i].textContent = `${day} дней`;
                    }

                    item.textContent = `${counter} ₽`;
                    resultDailyPrice[i].textContent = `${dailyPrice} ₽/день`;
                    resultPrices[i].textContent = `${counter} ₽`;
                }
            } else {
                if (stepBalanceTabs.length > 0) {
                    if (stepBalanceTabs[1].classList.contains("active")) {
                        if (calendarInputs[i].value !== "") {
                            let firstDay,
                                secondDay,
                                day,
                                counter,
                                currentMonth,
                                balanceDates = calendarBalance.selectedDates;

                            const dailyPriceSpans = dailyPrice[i].querySelectorAll("span");

                            if (balanceDates.length > 1) {
                                menuProgramms.forEach((programm, i) => {
                                    if (programm.classList.contains("menu-programm_balance") && programm.classList.contains("active")) {
                                        firstDay = balanceDates[0].getDate();
                                        secondDay = balanceDates[1].getDate();
                                        currentMonth = balanceDates[0].getMonth();
                                        day = Math.ceil((balanceDates[1] - balanceDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                    }
                                });

                                //! 	Связь дат

                                months.forEach((item, i) => {
                                    if (i == currentMonth) {
                                        menusDate.value = `${firstDay} ${item}`;
                                    }
                                });

                                //!

                                if (day == 1 || day == 21 || day == 31) {
                                    calendarsCount[i].innerHTML = `${day} <span>день</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>день</span>`;
                                    resultDays[i].textContent = `${day} день`;
                                    menuCalculatorDays[i].textContent = `${day} день`;
                                } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                                    calendarsCount[i].innerHTML = `${day} <span>дня</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дня</span>`;
                                    resultDays[i].textContent = `${day} дня`;
                                    menuCalculatorDays[i].textContent = `${day} дня`;
                                } else {
                                    calendarsCount[i].innerHTML = `${day} <span>дней</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дней</span>`;
                                    resultDays[i].textContent = `${day} дней`;
                                    menuCalculatorDays[i].textContent = `${day} дней`;
                                }

                                counter = day * parseInt(dailyPriceSpans[2].textContent);

                                item.textContent = `${counter} ₽`;
                                resultPrices[i].textContent = `${counter} ₽`;
                                changeDatesMenus(balanceDates[0]);
                            }
                        }
                    } else {
                        const spansDay = days[i].querySelectorAll("span");
                        let counter = 1,
                            day = parseInt(spansDay[0].textContent),
                            dailyPrice = parseInt(spansDay[2].textContent);

                        spansDay.forEach((item) => {
                            let number = parseInt(item.textContent);
                            if (!isNaN(number)) {
                                counter *= number;
                            }
                        });

                        if (day == 1 || day == 21 || day == 31) {
                            resultDays[i].textContent = `${day} день`;
                            menuCalculatorDays[i].textContent = `${day} день`;
                        } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                            resultDays[i].textContent = `${day} дня`;
                            menuCalculatorDays[i].textContent = `${day} дня`;
                        } else {
                            resultDays[i].textContent = `${day} дней`;
                            menuCalculatorDays[i].textContent = `${day} дней`;
                        }

                        item.textContent = `${counter} ₽`;
                        resultDailyPrice[i].textContent = `${dailyPrice} ₽/день`;
                        resultPrices[i].textContent = `${counter} ₽`;
                    }
                }
                if (stepKidsTabs.length > 0) {
                    if (stepKidsTabs[1].classList.contains("active")) {
                        if (calendarInputs[i].value !== "") {
                            let firstDay,
                                secondDay,
                                day,
                                counter,
                                currentMonth,
                                kidsDates = calendarKids.selectedDates;

                            const dailyPriceSpans = dailyPrice[i].querySelectorAll("span");

                            if (kidsDates.length > 1) {
                                if (programm.classList.contains("menu-programm_kids") && programm.classList.contains("active")) {
                                    firstDay = kidsDates[0].getDate();
                                    secondDay = kidsDates[1].getDate();
                                    currentMonth = kidsDates[0].getMonth();
                                    day = Math.ceil((kidsDates[1] - kidsDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                }

                                //! 	Связь дат

                                months.forEach((item, i) => {
                                    if (i == currentMonth) {
                                        menusDate.value = `${firstDay} ${item}`;
                                    }
                                });

                                //!

                                if (day == 1 || day == 21 || day == 31) {
                                    calendarsCount[i].innerHTML = `${day} <span>день</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>день</span>`;
                                    resultDays[i].textContent = `${day} день`;
                                    menuCalculatorDays[i].textContent = `${day} день`;
                                } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                                    calendarsCount[i].innerHTML = `${day} <span>дня</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дня</span>`;
                                    resultDays[i].textContent = `${day} дня`;
                                    menuCalculatorDays[i].textContent = `${day} дня`;
                                } else {
                                    calendarsCount[i].innerHTML = `${day} <span>дней</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дней</span>`;
                                    resultDays[i].textContent = `${day} дней`;
                                    menuCalculatorDays[i].textContent = `${day} дней`;
                                }

                                counter = day * parseInt(dailyPriceSpans[2].textContent);

                                item.textContent = `${counter} ₽`;
                                resultPrices[i].textContent = `${counter} ₽`;
                                changeDatesMenus(kidsDates[0]);
                            }
                        }
                    } else {
                        const spansDay = days[i].querySelectorAll("span");
                        let counter = 1,
                            day = parseInt(spansDay[0].textContent),
                            dailyPrice = parseInt(spansDay[2].textContent);

                        spansDay.forEach((item) => {
                            let number = parseInt(item.textContent);
                            if (!isNaN(number)) {
                                counter *= number;
                            }
                        });

                        if (day == 1 || day == 21 || day == 31) {
                            resultDays[i].textContent = `${day} день`;
                            menuCalculatorDays[i].textContent = `${day} день`;
                        } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                            resultDays[i].textContent = `${day} дня`;
                            menuCalculatorDays[i].textContent = `${day} дня`;
                        } else {
                            resultDays[i].textContent = `${day} дней`;
                            menuCalculatorDays[i].textContent = `${day} дней`;
                        }

                        item.textContent = `${counter} ₽`;
                        resultDailyPrice[i].textContent = `${dailyPrice} ₽/день`;
                        resultPrices[i].textContent = `${counter} ₽`;
                    }
                }
                if (stepMotherTabs.length > 0) {
                    if (stepMotherTabs[1].classList.contains("active")) {
                        if (calendarInputs[i].value !== "") {
                            let firstDay,
                                secondDay,
                                day,
                                counter,
                                currentMonth,
                                motherDates = calendarMother.selectedDates;

                            const dailyPriceSpans = dailyPrice[i].querySelectorAll("span");

                            if (motherDates.length > 1) {
                                menuProgramms.forEach((programm, i) => {
                                    if (programm.classList.contains("menu-programm_mother") && programm.classList.contains("active")) {
                                        firstDay = motherDates[0].getDate();
                                        secondDay = motherDates[1].getDate();
                                        currentMonth = motherDates[0].getMonth();
                                        day = Math.ceil((motherDates[1] - motherDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                    }
                                });

                                //! 	Связь дат

                                months.forEach((item, i) => {
                                    if (i == currentMonth) {
                                        menusDate.value = `${firstDay} ${item}`;
                                    }
                                });

                                //!

                                if (day == 1 || day == 21 || day == 31) {
                                    calendarsCount[i].innerHTML = `${day} <span>день</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>день</span>`;
                                    resultDays[i].textContent = `${day} день`;
                                    menuCalculatorDays[i].textContent = `${day} день`;
                                } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                                    calendarsCount[i].innerHTML = `${day} <span>дня</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дня</span>`;
                                    resultDays[i].textContent = `${day} дня`;
                                    menuCalculatorDays[i].textContent = `${day} дня`;
                                } else {
                                    calendarsCount[i].innerHTML = `${day} <span>дней</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дней</span>`;
                                    resultDays[i].textContent = `${day} дней`;
                                    menuCalculatorDays[i].textContent = `${day} дней`;
                                }

                                counter = day * parseInt(dailyPriceSpans[2].textContent);

                                item.textContent = `${counter} ₽`;
                                resultPrices[i].textContent = `${counter} ₽`;
                                changeDatesMenus(motherDates[0]);
                            }
                        }
                    } else {
                        const spansDay = days[i].querySelectorAll("span");
                        let counter = 1,
                            day = parseInt(spansDay[0].textContent),
                            dailyPrice = parseInt(spansDay[2].textContent);

                        spansDay.forEach((item) => {
                            let number = parseInt(item.textContent);
                            if (!isNaN(number)) {
                                counter *= number;
                            }
                        });

                        if (day == 1 || day == 21 || day == 31) {
                            resultDays[i].textContent = `${day} день`;
                            menuCalculatorDays[i].textContent = `${day} день`;
                        } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                            resultDays[i].textContent = `${day} дня`;
                            menuCalculatorDays[i].textContent = `${day} дня`;
                        } else {
                            resultDays[i].textContent = `${day} дней`;
                            menuCalculatorDays[i].textContent = `${day} дней`;
                        }

                        item.textContent = `${counter} ₽`;
                        resultDailyPrice[i].textContent = `${dailyPrice} ₽/день`;
                        resultPrices[i].textContent = `${counter} ₽`;
                    }
                }
                if (stepPregnantTabs.length > 0) {
                    if (stepPregnantTabs[1].classList.contains("active")) {
                        if (calendarInputs[i].value !== "") {
                            let firstDay,
                                secondDay,
                                day,
                                counter,
                                currentMonth,
                                pregnantDates = calendarPregnant.selectedDates;

                            const dailyPriceSpans = dailyPrice[i].querySelectorAll("span");

                            if (pregnantDates.length > 1) {
                                menuProgramms.forEach((programm, i) => {
                                    if (programm.classList.contains("menu-programm_pregnant") && programm.classList.contains("active")) {
                                        firstDay = pregnantDates[0].getDate();
                                        secondDay = pregnantDates[1].getDate();
                                        currentMonth = pregnantDates[0].getMonth();
                                        day = Math.ceil((pregnantDates[1] - pregnantDates[0]) / (1000 * 60 * 60 * 24)) + 1;
                                    }
                                });

                                //! 	Связь дат

                                months.forEach((item, i) => {
                                    if (i == currentMonth) {
                                        menusDate.value = `${firstDay} ${item}`;
                                    }
                                });

                                //!

                                if (day == 1 || day == 21 || day == 31) {
                                    calendarsCount[i].innerHTML = `${day} <span>день</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>день</span>`;
                                    resultDays[i].textContent = `${day} день`;
                                    menuCalculatorDays[i].textContent = `${day} день`;
                                } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                                    calendarsCount[i].innerHTML = `${day} <span>дня</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дня</span>`;
                                    resultDays[i].textContent = `${day} дня`;
                                    menuCalculatorDays[i].textContent = `${day} дня`;
                                } else {
                                    calendarsCount[i].innerHTML = `${day} <span>дней</span>`;
                                    dailyPriceSpans[0].innerHTML = `${day} <span>дней</span>`;
                                    resultDays[i].textContent = `${day} дней`;
                                    menuCalculatorDays[i].textContent = `${day} дней`;
                                }

                                counter = day * parseInt(dailyPriceSpans[2].textContent);

                                item.textContent = `${counter} ₽`;
                                resultPrices[i].textContent = `${counter} ₽`;
                                changeDatesMenus(pregnantDates[0]);
                            }
                        }
                    } else {
                        const spansDay = days[i].querySelectorAll("span");
                        let counter = 1,
                            day = parseInt(spansDay[0].textContent),
                            dailyPrice = parseInt(spansDay[2].textContent);

                        spansDay.forEach((item) => {
                            let number = parseInt(item.textContent);
                            if (!isNaN(number)) {
                                counter *= number;
                            }
                        });

                        if (day == 1 || day == 21 || day == 31) {
                            resultDays[i].textContent = `${day} день`;
                            menuCalculatorDays[i].textContent = `${day} день`;
                        } else if (day == 2 || day == 3 || day == 4 || day == 22 || day == 23 || day == 24) {
                            resultDays[i].textContent = `${day} дня`;
                            menuCalculatorDays[i].textContent = `${day} дня`;
                        } else {
                            resultDays[i].textContent = `${day} дней`;
                            menuCalculatorDays[i].textContent = `${day} дней`;
                        }

                        item.textContent = `${counter} ₽`;
                        resultDailyPrice[i].textContent = `${dailyPrice} ₽/день`;
                        resultPrices[i].textContent = `${counter} ₽`;
                    }
                }
            }
        });
    }

    calculationPrice();

    //*</Price calculator>=================================================================================================

    //!</Calculators>=================================================================================================

    //*</Calculators>=================================================================================================

    //!<Popups>=================================================================================================

    //?==============<Show popup>==============

    function showPopup(popup, popupClose) {
        overlay.classList.add("active");
        popup.classList.remove("hidden");
        body.classList.add("lock");
        header.classList.add("popup");

        if (socialsBtn != undefined) {
            socialsBtn.classList.add("hidden");
        }
        if (popup.classList.contains("popup-order")) {
            overlay.classList.add("order");
        }

        popupClose.addEventListener("click", (e) => {
            if (socialsBtn != undefined) {
                socialsBtn.classList.remove("hidden");
            }

            body.classList.remove("lock");
            header.classList.remove("popup");
            popup.classList.add("hidden");
            overlay.classList.remove("active");

            if (popup.classList.contains("popup-order")) {
                overlay.classList.remove("order");
            }
        });
    }

    //?==============<Show popup>==============

    //*<Popup call>=================================================================================================

    const popupCallBtn = document.querySelector('[href="#popupCall"]'),
        popupCall = document.querySelector(".popup-call"),
        popupCallClose = document.querySelector(".popup-call__close");

    popupCallBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showPopup(popupCall, popupCallClose);
        headerPanel.classList.remove("active");
        burger.classList.remove("active");
    });

    //*</Poup call>=================================================================================================

    //*<Call thanks>=================================================================================================

    const popupCallthanks = document.querySelector(".popup-callthanks"),
        popupCallThanksClose = document.querySelector(".popup-callthanks__close"),
        popupCallthanksBtn = document.querySelector(".popup-call__btn");

    if (popupCallThanksClose != undefined) {
        popupCallThanksClose.addEventListener("click", (e) => {
            if (document.documentElement.clientWidth > 768) {
                socialsBtn.classList.remove("hidden");
            }
            popupCallthanks.classList.add("hidden");
            overlay.classList.remove("active");
            body.classList.remove("lock");
        });
    }

    //?==============<Open Call Thanks>==============

    if (popupCallthanksBtn != undefined) {
        popupCallthanksBtn.addEventListener("click", (e) => {
            e.preventDefault();
            popupCallClose.click();
            showPopup(popupCallthanks, popupCallThanksClose);
        });
    }

    //?==============</Open Call Thanks>=============

    //*</Call thanks>=================================================================================================

    //*<Popup review>=================================================================================================

    const popupReviewBtns = document.querySelectorAll('[href="#popupReview"]'),
        popupReview = document.querySelector(".popup-review"),
        popupReviewClose = document.querySelector(".popup-review__close");

    popupReviewBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(popupReview, popupReviewClose);
        });
    });

    //*</Popup Review>=================================================================================================

    //*<Popup product>=================================================================================================

    const popupProductBtns = document.querySelectorAll('[href="#popupProduct"]'),
        popupProduct = document.querySelector(".popup-product"),
        popupProductClose = document.querySelector(".popup-product__close");

    popupProductBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(popupProduct, popupProductClose);
        });
    });

    //*</Popup Product>=================================================================================================

    //*<Quick order>=================================================================================================

    const popupQuickOrder = document.querySelector(".popup-quickorder"),
        popupQuickOrderClose = document.querySelector(".popup-quickorder__close");

    //*</Quick order>=================================================================================================

    //*<Order>=================================================================================================

    const popupOrder = document.querySelector(".popup-order"),
        popupOrderClose = document.querySelector(".popup-order__close");

    //*</Order>=================================================================================================

    //*<Chose order>=================================================================================================

    const popupChooseBtns = document.querySelectorAll('[href="#popupChoose"]'),
        popupChoose = document.querySelector(".popup-chooseorder"),
        popupChooseClose = document.querySelector(".popup-chooseorder__close"),
        quickOrder = document.querySelector('[href="#quickOrder"]'),
        slowOrder = document.querySelectorAll('[href="#slowOrder"]');

    if (quickOrder != undefined) {
        quickOrder.addEventListener("click", (e) => {
            popupChooseClose.click();
            showPopup(popupQuickOrder, popupQuickOrderClose);
        });
    }

    if (slowOrder != undefined) {
        slowOrder.forEach((item, i) => {
            item.addEventListener("click", (e) => {
                popupChooseClose.click();
                showPopup(popupOrder, popupOrderClose);
            });
        });
    }

    popupChooseBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(popupChoose, popupChooseClose);
        });
    });

    //*</Chose order>=================================================================================================

    //*<Order thanks>=================================================================================================

    const popupOrderThanks = document.querySelector(".popup-thanks"),
        popupOrderThanksClose = document.querySelector(".popup-thanks__close");

    if (popupOrderThanksClose != undefined) {
        popupOrderThanksClose.addEventListener("click", (e) => {
            if (document.documentElement.clientWidth > 768) {
                socialsBtn.classList.remove("hidden");
            }
            popupOrderThanks.classList.add("hidden");
            overlay.classList.remove("active");
            body.classList.remove("lock");
        });
    }

    //*</Order thanks>=================================================================================================

    //*<Open thanksorder>=================================================================================================

    const btnsOrder = document.querySelectorAll('[data-order="button"]');

    btnsOrder.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            popupOrderClose.click();
            showPopup(popupOrderThanks, popupOrderThanksClose);
        });
    });

    //*</Open thanksorder>=================================================================================================

    //*<Popup Calculator>=================================================================================================

    const btnOpenCalculator = document.querySelector('[href="#openCalculator"]'),
        popupCalculator = document.querySelector(".popup-calculator"),
        popupCalculatorClose = document.querySelector(".popup-calculator__close");

    if (btnOpenCalculator != undefined) {
        btnOpenCalculator.addEventListener("click", (e) => {
            e.preventDefault();
            showPopup(popupCalculator, popupCalculatorClose);
        });
    }

    //*</Popup Calculator>=================================================================================================

    //!</Popups>=================================================================================================

    //!<Sliders>=================================================================================================

    //*<Slider mainscreen>=================================================================================================

    const swiperMainNode = document.querySelector(".slider-main");

    let swiperMain;

    if (swiperMainNode != undefined) {
        let swiperMainOptions = {
            direction: "horizontal",
            spaceBetween: 30,
            slidesPerView: 1,
            simulateTouch: false,
            autoHeight: true,
            speed: 1000,

            autoplay: {
                delay: 6000,
            },

            effect: "fade",
            fadeEffect: {
                crossfade: true,
            },

            breakpoints: {
                320: {},
                576: {},
                768: {},
                1200: {},
            },
        };

        swiperMain = new Swiper(swiperMainNode, swiperMainOptions);

        function changeTab() {
            const sliderMainSlider = document.querySelectorAll(".slider-main__slide");
            sliderMainSlider.forEach((item, i) => {
                setTimeout(function () {
                    if (item.classList.contains("swiper-slide-active")) {
                        mainscreenTabs[i].classList.add("active");
                        swiperTabs.slideTo(i);
                        mainscreenTabs.forEach((tab, j) => {
                            if (i != j) {
                                tab.classList.remove("active");
                            }
                        });
                    }
                }, 300);
            });
        }

        swiperMain.on("slideChange", changeTab);
    }

    //*</Slider mainscreen>=================================================================================================

    //*<Slider Mainscreen Food>=================================================================================================

    const swiperMainscreenFoodNode = document.querySelectorAll(".slider-mainscreen-food");

    if (swiperMainscreenFoodNode != undefined) {
        let swiperMainscreenFoodOptions = {
            direction: "horizontal",
            spaceBetween: 30,
            slidesPerView: 1,
            speed: 1000,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                320: {},
                576: {},
                768: {},
                1200: {},
            },
        };

        swiperMainscreenFoodNode.forEach((item) => {
            new Swiper(item, swiperMainscreenFoodOptions);
        });
    }

    //*</Slider Mainscreen Food>=================================================================================================

    //*<Slider Menus Tabs>=================================================================================================

    const swiperMenuTabsNode = document.querySelector(".slider-tabsmenu");

    if (swiperMenuTabsNode != undefined) {
        let swipersMenuTabsOptions = {
            direction: "horizontal",
            slidesPerView: 4,
            spaceBetween: 12,
            speed: 1000,

            breakpoints: {
                400: { slidesPerView: 5.185 },
                576: {},
            },
        };

        if (document.documentElement.clientWidth < 576) {
            let swiperMenuTabs = new Swiper(swiperMenuTabsNode, swipersMenuTabsOptions);
        }
    }

    //*</Slider Menus Tabs>=================================================================================================

    //*<Slider food>=================================================================================================

    const swiperFoodNode = document.querySelector(".slider-food");

    if (swiperFoodNode != undefined) {
        let swiperFoodOptions = {
            direction: "horizontal",
            spaceBetween: 100,
            slidesPerView: 1,
            speed: 1000,
            loop: true,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                320: {},
                576: {},
                768: {},
                1200: {},
            },
        };

        let swiperFood = new Swiper(swiperFoodNode, swiperFoodOptions);
    }

    //*</Slider food>=================================================================================================

    //*<Slider tabs>=================================================================================================

    const swiperTabsNode = document.querySelector(".slider-tabs");
    let swiperTabs;

    if (swiperTabsNode != undefined) {
        let swiperTabsOptions = {
            direction: "horizontal",
            slidesPerView: "auto",
            speed: 1000,

            breakpoints: {
                320: { spaceBetween: 6 },
                576: { spaceBetween: 9 },
            },
        };

        swiperTabs = new Swiper(swiperTabsNode, swiperTabsOptions);
    }

    //*</Slider tabs>=================================================================================================

    //*<Slider support>=================================================================================================

    const swiperSupportNode = document.querySelector(".slider-support");

    if (swiperSupportNode != undefined) {
        let swiperSupportOptions = {
            direction: "horizontal",
            spaceBetween: -60,
            slidesPerView: "auto",
            speed: 1000,
            loop: true,

            navigation: {
                nextEl: ".slider-support__next",
                prevEl: ".slider-support__prev",
            },

            breakpoints: {
                320: {},
                768: { spaceBetween: -60 },
                1200: {},
            },
        };

        let swiperSupport = new Swiper(swiperSupportNode, swiperSupportOptions);
    }

    //*</Slider support>=================================================================================================

    //*<Slider Menus>=================================================================================================

    const swiperMenusNode = document.querySelectorAll(".slider-menus");

    if (swiperMenusNode != undefined) {
        let swiperMenusOptions = {
            direction: "horizontal",
            slidesPerView: "auto",
            speed: 1000,
            spaceBetween: 24,
            navigation: {
                nextEl: ".slider-menus__next",
                prevEl: ".slider-menus__prev",
            },

            breakpoints: {
                100: {
                    spaceBetween: 16,
                },
                576: {},
                1200: {},
            },
        };

        swiperMenusNode.forEach((item) => {
            new Swiper(item, swiperMenusOptions);
        });
    }

    //*</Slider Menus>=================================================================================================

    //*<Slider programms>=================================================================================================

    const swiperProgrammsNode = document.querySelector(".slider-programms");

    if (swiperProgrammsNode != undefined) {
        let swiperProgrammsOptions = {
            direction: "horizontal",
            spaceBetween: 16,
            slidesPerView: "auto",
            speed: 1000,

            breakpoints: {
                320: {},
                1200: { slidesPerView: 3, spaceBetween: 25 },
            },
        };

        let swiperProgramms = new Swiper(swiperProgrammsNode, swiperProgrammsOptions);
    }

    //*</Slider programms>=================================================================================================

    //*<Slider products>=================================================================================================

    const swiperProductsNode = document.querySelector(".products-slider");

    if (swiperProductsNode != undefined) {
        let swiperProductsOptions = {
            direction: "horizontal",
            spaceBetween: 30,
            slidesPerView: 1,
            speed: 1000,
            loop: true,

            navigation: {
                nextEl: ".products-slider__next",
                prevEl: ".products-slider__prev",
            },

            breakpoints: {
                320: {},
                1200: {},
            },
        };

        let swiperProducts = new Swiper(swiperProductsNode, swiperProductsOptions);
    }

    //*</Slider products>=================================================================================================

    //*<Slider changes>=================================================================================================

    const swiperChangesNode = document.querySelector(".changes-slider");

    if (swiperChangesNode != undefined) {
        if (document.documentElement.clientWidth < 992) {
            let swiperChangesOptions = {
                direction: "horizontal",
                spaceBetween: 20,
                slidesPerView: "auto",
                speed: 1000,
                loop: true,

                breakpoints: {
                    320: {},
                    1200: {},
                },
            };

            let swiperChanges = new Swiper(swiperChangesNode, swiperChangesOptions);
        }
    }

    //*</Slider changes>=================================================================================================

    //*<Slider changes>=================================================================================================

    const swiperTeamNode = document.querySelector(".slider-team");

    if (swiperTeamNode != undefined) {
        let swiperChangesOptions = {
            direction: "horizontal",
            spaceBetween: 24,
            slidesPerView: "auto",
            speed: 1000,
            loop: true,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                100: {},
                768: {},
                992: { loop: false },
            },
        };

        let swiperTeam = new Swiper(swiperTeamNode, swiperChangesOptions);
    }

    //*</Slider changes>=================================================================================================

    //*<Articles tabs>=================================================================================================

    const swiperArticlesTabsNode = document.querySelector(".articles__tabs");

    if (swiperArticlesTabsNode != undefined) {
        let swiperArticlesTabsOptions = {
            direction: "horizontal",
            spaceBetween: 0,
            slidesPerView: "auto",
            speed: 1000,
            loop: false,

            breakpoints: {
                100: {},
                768: {},
                1200: {},
            },
        };

        let swiperArticlesTabs = new Swiper(swiperArticlesTabsNode, swiperArticlesTabsOptions);
    }

    //*</Articles tabs>=================================================================================================

    //*<Slider Articles>=================================================================================================

    const swiperArticlesNode = document.querySelectorAll(".slider-articles");

    if (swiperArticlesNode != undefined) {
        swiperArticlesNode.forEach((item) => {
            let swiperArticlesOptions = {
                direction: "horizontal",
                spaceBetween: 24,
                slidesPerView: "auto",
                speed: 1000,
                loop: true,

                simulateTouch: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },

                breakpoints: {
                    100: { simulateTouch: true },
                    768: {},
                    992: { simulateTouch: false, loop: false },
                },
            };

            let swiperArticles = new Swiper(item, swiperArticlesOptions);
        });
    }

    //*</Slider About Blog Articles>=================================================================================================

    //*<Slider reviews>=================================================================================================

    const swiperReviewNode = document.querySelectorAll(".slider-review"),
        swiperReviewMobileNode = document.querySelector(".slider-review-mobile");

    if (swiperReviewNode != undefined) {
        let swiperReviewsOptions = {
            direction: "horizontal",
            spaceBetween: 30,
            slidesPerView: "auto",
            speed: 1000,
            loop: true,
            simulateTouch: false,

            navigation: {
                nextEl: ".slider-review__next",
                prevEl: ".slider-review__prev",
            },

            breakpoints: {
                320: {},
                1200: {},
            },
        };

        swiperReviewNode.forEach((item) => {
            let swiperReviews = new Swiper(item, swiperReviewsOptions);
        });
    }

    if (swiperReviewMobileNode != undefined) {
        let swiperReviewsMobileOptions = {
            direction: "horizontal",
            spaceBetween: 16,
            slidesPerView: "auto",
            speed: 1000,
            loop: true,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".slider-review__next",
                prevEl: ".slider-review__prev",
            },

            breakpoints: {
                320: {},
                768: { spaceBetween: 24 },
                1200: {},
            },
        };

        let swiperReviewsMobile = new Swiper(swiperReviewMobileNode, swiperReviewsMobileOptions);
    }

    //*</Slider reviews>=================================================================================================

    //*<Sliders nature>=================================================================================================

    //?==============<Slider nature img>==============

    const swiperNatureImgsNode = document.querySelector(".slider-nature-imgs");

    let swiperNatureImgs;

    if (swiperNatureImgsNode != undefined) {
        let swiperNatureImgsOptions = {
            direction: "horizontal",
            spaceBetween: 30,
            slidesPerView: "auto",
            speed: 1000,
            // loop: true,

            pagination: {
                el: ".nature__fraction",
                type: "fraction",
            },

            breakpoints: {
                100: {},
                768: {},
                1200: {},
            },
        };

        swiperNatureImgs = new Swiper(swiperNatureImgsNode, swiperNatureImgsOptions);
    }

    //?==============</Slider nature img>=============

    //?==============<Slider nature advantages>==============

    const swiperNatureAdvantagesNode = document.querySelector(".slider-nature-advantages");

    let swiperNatureAdvantages;

    if (swiperNatureAdvantagesNode != undefined) {
        let swiperNatureAdvantagesOptions = {
            direction: "horizontal",
            spaceBetween: 24,
            slidesPerView: "auto",
            speed: 1000,

            pagination: {
                el: ".swiper-pagination",
                clickable: "true",
            },

            navigation: {
                prevEl: ".slider-nature-advantages__prev",
                nextEl: ".slider-nature-advantages__next",
            },

            breakpoints: {
                100: {},
                768: {},
                1200: {},
            },
        };

        swiperNatureAdvantages = new Swiper(swiperNatureAdvantagesNode, swiperNatureAdvantagesOptions);

        swiperNatureAdvantages.on("slideChange", progressSliderCircle);
    }

    //?==============</Slider nature advantages>=============

    if (swiperNatureAdvantages != undefined) {
        swiperNatureAdvantages.controller.control = swiperNatureImgs;
    }
    if (swiperNatureImgs != undefined) {
        swiperNatureImgs.controller.control = swiperNatureAdvantages;
    }

    //?==============<Progress cirlce>==============

    const slidesNatureLeft = document.querySelector(".sliders-nature__circle");

    function progressSliderCircle() {
        const activeIndex = swiperNatureAdvantages.activeIndex,
            currentIndex = swiperNatureAdvantages.realIndex,
            prevIndex = swiperNatureAdvantages.previousIndex,
            slides = swiperNatureAdvantages.slides,
            slidersNatureBullets = document.querySelectorAll(".sliders-nature__bullet");

        // swiperNatureImgs.slideTo(activeIndex);

        let progressValue,
            speed = 25,
            progressEndValue,
            progressInterval;

        if (prevIndex < activeIndex || slides - 1 == prevIndex) {
            if (currentIndex == 0) {
                progressValue = -1;
                progressEndValue = 0;
                slidersNatureBullets.forEach((item, i) => {
                    if (i != 0) {
                        item.classList.remove("active");
                    } else {
                        item.classList.add("active");
                        item.classList.add("current");
                    }
                });
            } else if (currentIndex == 1) {
                progressValue = 0;
                progressEndValue = 25;
                slidersNatureBullets[0].classList.remove("current");
                slidersNatureBullets[1].classList.add("active");
                slidersNatureBullets[1].classList.add("current");
            } else if (currentIndex == 2) {
                progressValue = 25;
                progressEndValue = 50;
                slidersNatureBullets[1].classList.remove("current");
                slidersNatureBullets[2].classList.add("active");
                slidersNatureBullets[2].classList.add("current");
            } else if (currentIndex == 3) {
                progressValue = 50;
                progressEndValue = 100;
                slidersNatureBullets[2].classList.remove("current");
                slidersNatureBullets[3].classList.add("active");
                slidersNatureBullets[3].classList.add("current");
            }

            progressInterval = setInterval(progress, speed);
        } else {
            if (currentIndex == 0) {
                progressValue = 25;
                progressEndValue = 0;
                slidersNatureBullets.forEach((item, i) => {
                    if (i != 0) {
                        item.classList.remove("active");
                        item.classList.remove("current");
                    } else {
                        item.classList.add("current");
                    }
                });
            } else if (currentIndex == 1) {
                progressValue = 50;
                progressEndValue = 25;
                slidersNatureBullets[1].classList.add("active");
                slidersNatureBullets[1].classList.add("current");
                slidersNatureBullets[2].classList.remove("current");
                slidersNatureBullets[2].classList.remove("active");
            } else if (currentIndex == 2) {
                progressValue = 100;
                progressEndValue = 50;
                slidersNatureBullets[3].classList.remove("active");
                slidersNatureBullets[3].classList.remove("current");
                slidersNatureBullets[2].classList.add("current");
            }

            progressInterval = setInterval(unProgress, speed);
        }

        function progress() {
            progressValue++;

            slidesNatureLeft.style.background = `conic-gradient(
    				#9bd03d ${progressValue * 3.6}deg,
    				#E1E2E1 ${progressValue * 3.6}deg
    				)`;

            if (progressValue == progressEndValue) {
                clearInterval(progressInterval);
            }
        }

        function unProgress() {
            progressValue--;

            slidesNatureLeft.style.background = `conic-gradient(
    				#9bd03d ${progressValue * 3.6}deg,
    				#E1E2E1 ${progressValue * 3.6}deg
    				)`;

            if (progressValue == progressEndValue) {
                clearInterval(progressInterval);
            }
        }
    }

    if (swiperNatureAdvantages != undefined) {
        progressSliderCircle();
    }

    //?==============</Progress circle>=============

    //*</Sliders nature>=================================================================================================

    //!</Sliders>=================================================================================================

    //TODO<Different>=================================================================================================

    //*<Current day>=================================================================================================

    let currentDate = new Date();

    if (calendarMenusNode != undefined) {
        calendarMenu.selectDate(currentDate);
    }

    menusDate.value = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

    changeDatesInMenusTabs(tabsMenus, currentDate);

    //*</Current day>=================================================================================================

    //*<Tipps>=================================================================================================

    const tipps = document.querySelectorAll(".tip"),
        tippsContent = document.querySelectorAll(".tip__content");

    if (document.documentElement.clientWidth < 992) {
        tipps.forEach((tip, i) => {
            tip.addEventListener("click", (e) => {
                tip.classList.toggle("active");
                tippsContent[i].classList.toggle("active");
                tipps.forEach((item, j) => {
                    if (i != j) {
                        item.classList.remove("active");
                    }
                });
                tippsContent.forEach((item, j) => {
                    if (i != j) {
                        item.classList.remove("active");
                    }
                });
            });
        });
    }

    //*</Tipps>=================================================================================================

    //*<Dynamic circle>=================================================================================================

    function progressNutrients() {
        const nutrientsCircle = document.querySelectorAll(".nutrient__circle");

        nutrientsCircle.forEach((item, i) => {
            let progressValue = 0,
                progressEndValue = parseInt(item.textContent),
                speed = 50;

            function progress() {
                progressValue++;
                item.textContent = `${progressValue}%`;
                if (item.classList.contains("s")) {
                    item.style.background = `conic-gradient(
					#9bd03d ${progressValue * 3.6}deg,
					#DDF0BA ${progressValue * 3.6}deg
					)`;
                } else if (item.classList.contains("f")) {
                    item.style.background = `conic-gradient(
					#F3C75C ${progressValue * 3.6}deg,
					#FDF2D7 ${progressValue * 3.6}deg 
					)`;
                } else if (item.classList.contains("c")) {
                    item.style.background = `conic-gradient(
						#FF6A3A ${progressValue * 3.6}deg,
						#FFE1D8 ${progressValue * 3.6}deg
					)`;
                }

                if (progressValue == progressEndValue) {
                    clearInterval(progressInterval);
                }
            }

            let progressInterval = setInterval(progress, speed);
        });
    }

    progressNutrients();

    //*</Dynamic circle>=================================================================================================

    //*<Socials btn>=================================================================================================

    const socialsBtnBody = document.querySelector(".socials-btn__body"),
        socialsBtn = document.querySelector(".socials-btn"),
        overlay = document.querySelector(".overlay"),
        body = document.body;

    if (socialsBtnBody != undefined) {
        socialsBtnBody.addEventListener("click", (e) => {
            body.classList.toggle("lock");
            socialsBtnBody.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    }

    //*</Socials btn>=================================================================================================

    //*<Burger>=================================================================================================

    const burger = document.querySelector(".header__burger"),
        headerPanel = document.querySelector(".header__panel");

    if (burger != undefined) {
        burger.addEventListener("click", (e) => {
            if (socialsBtn != undefined) {
                socialsBtn.classList.toggle("hidden");
            }

            body.classList.toggle("lock");
            burger.classList.toggle("active");
            headerPanel.classList.toggle("active");
        });
    }

    //*</Burger>=================================================================================================

    //*<Header>=================================================================================================
    let lastScrollTop = 0;

    window.addEventListener("scroll", (e) => {
        let st = document.documentElement.scrollTop;
        if (st > 50) {
            if (st >= lastScrollTop) {
                header.classList.add("scroll-down");
                header.classList.remove("scroll-up");
            } else {
                header.classList.add("scroll-up");
                header.classList.remove("scroll-down");
            }
        }

        lastScrollTop = st <= 50 ? 50 : st;
    });

    //*</Header>=================================================================================================

    //*<Lazyload>=================================================================================================

    //*</Lazyload>=================================================================================================

    //*<About Blog Link>=================================================================================================

    const aboutBlogArticleLinks = document.querySelectorAll(".article__link"),
        aboutBlogArticleP = document.querySelectorAll(".article__bottom p"),
        authorLinks = document.querySelectorAll(".article__author");

    addVisibleOnArticleP(aboutBlogArticleLinks, aboutBlogArticleP);
    addVisibleOnArticleP(authorLinks, aboutBlogArticleP);

    //*</About Blog Link>=================================================================================================

    //*<About Blog Link>=================================================================================================

    const blogPopularArticlesLinks = document.querySelectorAll(".popular-article__link"),
        blogPopularArticlesP = document.querySelectorAll(".popular-article__info p"),
        blogPopularArticleAuthors = document.querySelectorAll(".popular-article__author");

    addVisibleOnArticleP(blogPopularArticlesLinks, blogPopularArticlesP);
    addVisibleOnArticleP(blogPopularArticleAuthors, blogPopularArticlesP);

    //*</About Blog Link>=================================================================================================

    //*<Functuin visible on hover>=================================================================================================

    function addVisibleOnArticleP(links, p) {
        if (links.length > 0) {
            links.forEach((item, i) => {
                if (item != undefined) {
                    item.addEventListener("mouseover", (e) => {
                        p[i].classList.add("visible");
                    });
                    item.addEventListener("mouseleave", (e) => {
                        p[i].classList.remove("visible");
                    });
                }
            });
        }
    }
    //*</Functuin visible on hover>=================================================================================================

    //TODO</Different>=================================================================================================
});

//!<Jquery>=================================================================================================

$(document).ready(function () {
    //*<Phone Mask>=================================================================================================

    $(".tel").mask("+7 (999) 999-99-99");

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    };

    $('input[type="tel"]').click(function () {
        $(this).setCursorPosition(4); // set position number
    });

    //*</Phone Mask>=================================================================================================

    //*<Faq spoiler>=================================================================================================

    let faqSpoilers = $(".faq-spoiler__title");

    $(faqSpoilers[0]).next().slideToggle(500);

    $(faqSpoilers).each(function (i, item) {
        $(item).click(function () {
            $(this).toggleClass("active").next().slideToggle(500);
            $(this).parent().toggleClass("active");
        });
    });

    //*</Faq spoiler>=================================================================================================

    //*<Order Interval>=================================================================================================

    const orderInterval = $(".order__interval button");

    if ($(window).width() < 768) {
        $(orderInterval).click(function (e) {
            e.preventDefault();
            $(orderInterval).toggleClass("active").next().slideToggle(500);
        });
    }

    //*</Order Interval>=================================================================================================

    //*<Calculator selector>=================================================================================================

    const calculatorSelectors = $(".calculator-selector button");

    $(calculatorSelectors).each(function (i, selector) {
        const selectorParent = $(selector).parent(),
            selectorList = $(selectorParent).find("ul"),
            selectorListItems = selectorList.find("li");
        $(selector).click(function () {
            $(this).toggleClass("active");
            selectorList.slideToggle(300);
        });

        $(selectorListItems).each(function (i, item) {
            $(item).click(function () {
                selectorList.slideToggle(300);
            });
        });
    });

    //*</Calculator selector>=================================================================================================

    //*<Scroll-to>=================================================================================================

    $("a.scroll-to").on("click", function (e) {
        e.preventDefault();
        var anchor = $(this).attr("href");
        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $(anchor).offset().top - 0,
                },
                1500
            );
    });

    //*</Scroll-to>=================================================================================================

    //*<Breadcrumbs scroll>=================================================================================================

    const breadcrumbs = $(".mainscreen-programm__breadcrumbs");

    if ($(breadcrumbs) != undefined && document.documentElement.clientWidth < 576) {
        let width = breadcrumbs.width();
        $(breadcrumbs).animate({ scrollLeft: width }, 100);
    }

    //*</Beradcrumbs scroll>=================================================================================================

    //*<City>=================================================================================================

    const city = $("#city");

    if ($(city).length > 0) {
        $(city).suggestions({
            token: "3e5991c5093e73b6346432d42af3a1c60b4250a5",
            type: "ADDRESS",
            /* Вызывается, когда пользователь выбирает одну из подсказок */
            onSelect: function (suggestion) {},
        });
    }

    //*</City>=================================================================================================
});

//!</Jquery>================================================================================================
