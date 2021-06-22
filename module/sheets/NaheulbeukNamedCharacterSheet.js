export default class NaheulbeukNamedCharacterSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/naheulbeuk/templates/sheets/namedCharacter-sheet.hbs",
            classes: ["naheulbeuk", "sheet", "namedCharacter"],
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "character" }]
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


        console.log(data);
        for (let index = 0; index < data.actor.items.length; index++) {
            if (data.actor.items[index].type == "spell") {
                data.spells.list.push(data.actor.items[index]);
            }
        }
        console.log(data.spells);
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

        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
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


        $(".abilityValue, .abilityName").click(function() {

            const words = $(this).parent().parent().find(".abilityValue span").attr('name').split('.');

            let r = new Roll("1d20");
            r.evaluate({ "async": false });
            var classDice = parseInt($(this).parent().parent().find(".abilityValue span").text()) >= r.total ? "success" : "fail";
            if (r.total == 1)
                classDice = 'successCrit';
            if (r.total == 20)
                classDice = 'failCrit';

            let chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                content: "Test de  " + CONFIG.naheulbeuk.ability[words[2]] + "(" + $(this).parent().parent().find(".abilityValue span").text() + ") <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
            };
            r.toMessage(chatData);
        });



    }



}