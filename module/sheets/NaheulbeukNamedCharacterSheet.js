export default class NaheulbeukNamedCharacterSheet extends ActorSheet {

    static get defaultOptions() {
        console.log("LOOADDING");
        return mergeObject(super.defaultOptions, {
            template: "systems/naheulbeuk/templates/sheets/namedCharacter-sheet.hbs",
            classes: ["naheulbeuk", "sheet", "namedCharacter"]
        });
    }

    getData() {
        // Retrieve base data structure.
        const data = super.getData();

        // Grab the item's data.
        const actorData = data.data;

        // Re-define the template data references.
        data.actor = actorData;
        data.data = actorData.data;
        data.config = CONFIG.naheulbeuk;
        data.spells = {
            list: [],
            level1: [],
            level2: [],
            level3: [],
            level4: [],
            level5: [],
            level6: [],
            level7: [],
            level8: [],
            level9: [],
            level10: []
        };


        data.data.abilities.ADR.bonus = 0;
        data.data.abilities.CHA.bonus = 0;
        data.data.abilities.COU.bonus = 0;
        data.data.abilities.FO.bonus = 0;
        data.data.abilities.INT.bonus = 0;
        data.data.abilities.AT.bonus = 0;
        data.data.abilities.PRD.bonus = 0;
        data.data.abilities.PR.bonus = 0;
        data.data.abilities.PRMag.bonus = 0;


        for (let index = 0; index < actorData.items.length; index++) {
            if (actorData.items[index].type != "spell") {
                data.data.abilities.ADR.bonus += actorData.items[index].data.abilities.ADR;
                data.data.abilities.CHA.bonus += actorData.items[index].data.abilities.CHA;
                data.data.abilities.COU.bonus += actorData.items[index].data.abilities.COU;
                data.data.abilities.FO.bonus += actorData.items[index].data.abilities.FO;
                data.data.abilities.INT.bonus += actorData.items[index].data.abilities.INT;

                if (actorData.items[index].type == "weapon") {
                    data.data.abilities.AT.bonus += actorData.items[index].data.modAT;
                    data.data.abilities.PRD.bonus += actorData.items[index].data.modPRD;
                }

                if (actorData.items[index].type == "armor") {
                    data.data.abilities.PR.bonus += actorData.items[index].data.PR;
                    data.data.abilities.PRMag.bonus += actorData.items[index].data.PRMag;
                }
            } else {
                data.spells.list.push(actorData.items[index]);
            }
        }
        console.log(actorData.items);


        data.data.abilities.MP.total = parseInt(data.data.abilities.MP.base) + parseInt(data.data.abilities.MP.bonus) + parseInt(data.data.abilities.MP.mod);
        data.data.abilities.AT.total = parseInt(data.data.abilities.AT.base) + parseInt(data.data.abilities.AT.bonus) + parseInt(data.data.abilities.AT.mod);
        data.data.abilities.PRD.total = parseInt(data.data.abilities.PRD.base) + parseInt(data.data.abilities.PRD.bonus) + parseInt(data.data.abilities.PRD.mod);
        data.data.abilities.COU.total = parseInt(data.data.abilities.COU.base) + parseInt(data.data.abilities.COU.bonus) + parseInt(data.data.abilities.COU.mod);
        data.data.abilities.INT.total = parseInt(data.data.abilities.INT.base) + parseInt(data.data.abilities.INT.bonus) + parseInt(data.data.abilities.INT.mod);
        data.data.abilities.CHA.total = parseInt(data.data.abilities.CHA.base) + parseInt(data.data.abilities.CHA.bonus) + parseInt(data.data.abilities.CHA.mod);
        data.data.abilities.ADR.total = parseInt(data.data.abilities.ADR.base) + parseInt(data.data.abilities.ADR.bonus) + parseInt(data.data.abilities.ADR.mod);
        data.data.abilities.FO.total = parseInt(data.data.abilities.FO.base) + parseInt(data.data.abilities.FO.bonus) + parseInt(data.data.abilities.FO.mod);
        data.data.abilities.PR.total = parseInt(data.data.abilities.PR.base) + parseInt(data.data.abilities.PR.bonus) + parseInt(data.data.abilities.PR.mod);
        data.data.abilities.PRMag.total = parseInt(data.data.abilities.PRMag.base) + parseInt(data.data.abilities.PRMag.bonus) + parseInt(data.data.abilities.PRMag.mod);
        data.data.abilities.HP.total = parseInt(data.data.abilities.HP.base) + parseInt(data.data.abilities.HP.bonus);
        data.data.abilities.HPMAX.total = parseInt(data.data.abilities.HPMAX.base) + parseInt(data.data.abilities.HPMAX.bonus);
        data.data.abilities.MP.total = parseInt(data.data.abilities.MP.base) + parseInt(data.data.abilities.MP.bonus);
        data.data.abilities.MPMAX.total = parseInt(data.data.abilities.MPMAX.base) + parseInt(data.data.abilities.MPMAX.bonus);

        data.data.abilities.MagPHY.base = Math.round((parseInt(data.data.abilities.ADR.total) + parseInt(data.data.abilities.INT.total)) / 2 + parseInt(data.data.abilities.MagPHY.bonus));
        data.data.abilities.MagPHY.total = parseInt(data.data.abilities.MagPHY.base) + parseInt(data.data.abilities.MagPHY.mod);

        data.data.abilities.MagPSY.base = Math.round((parseInt(data.data.abilities.CHA.total) + parseInt(data.data.abilities.INT.total)) / 2 + parseInt(data.data.abilities.MagPSY.bonus));
        data.data.abilities.MagPSY.total = parseInt(data.data.abilities.MagPSY.base) + parseInt(data.data.abilities.MagPSY.mod);

        data.data.abilities.ReMag.base = Math.round((parseInt(data.data.abilities.COU.total) + parseInt(data.data.abilities.INT.total) + parseInt(data.data.abilities.FO.total)) / 3 + parseInt(data.data.abilities.ReMag.bonus));
        data.data.abilities.ReMag.total = parseInt(data.data.abilities.ReMag.base) + parseInt(data.data.abilities.ReMag.mod);



        data.data.goldTotal = parseInt(data.data.gold) + (500 * parseInt(data.data.berylium)) + (100 * parseInt(data.data.thritil));
        console.log(data);

        data.spells.list.sort(function(a, b) { return a.data.spellLevel - b.data.spellLevel });

        for (let index = 0; index < data.spells.list.length; index++) {
            switch (data.spells.list[index].data.spellLevel) {
                case 1:
                    data.spells.level1.push(data.spells.list[index]);
                    break;
                case 2:
                    data.spells.level2.push(data.spells.list[index]);
                    break;
                case 3:
                    data.spells.level3.push(data.spells.list[index]);
                    break;
                case 4:
                    data.spells.level4.push(data.spells.list[index]);
                    break;
                case 5:
                    data.spells.level5.push(data.spells.list[index]);
                    break;
                case 6:
                    data.spells.level6.push(data.spells.list[index]);
                    break;
                case 7:
                    data.spells.level7.push(data.spells.list[index]);
                    break;
                case 8:
                    data.spells.level8.push(data.spells.list[index]);
                    break;
                case 9:
                    data.spells.level9.push(data.spells.list[index]);
                    break;
                case 10:
                    data.spells.level10.push(data.spells.list[index]);
                    break;

            }

        }
        console.log(data);

        return data;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Add Inventory Item


        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            console.log(li);
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });


        $("#buttonsCharacterSheet button").click(function() {
            $("#buttonsCharacterSheet .active").attr('disabled', false)
            $("#buttonsCharacterSheet .active").removeClass("active");

            $(this).attr('disabled', true);
            $(this).addClass("active");
        });

        $("#buttonCharacterSheetCharacter").click(function() {
            console.log("buttonCharacterSheetCharacter");
            $("#characterInformationSheet").show();
            $("#spellBookSheet").hide();
            $("#characterSettingsSheet").hide();

        });

        $("#buttonCharacterSheetSpellBook").click(function() {
            $("#spellBookSheet").css('display', 'block');
            $("#characterInformationSheet").hide();
            $("#characterSettingsSheet").hide();

        });

        $("#buttonCharacterSheetSettings").click(function() {
            console.log("buttonCharacterSheetSettings");

            $("#characterSettingsSheet").show();
            $("#characterInformationSheet").hide();
            $("#spellBookSheet").hide();

        });


    }



}