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


        for (let index = 0; index < data.actor.items.length; index++) {
            if (data.actor.items[index].type == "spell") {
                data.spells.list.push(data.actor.items[index]);
            }
        }
        data.spells.list.sort(function(a, b) { return a.data.spellLevel - b.data.spellLevel });

        for (let index = 0; index < data.spells.list.length; index++) {
            data.spells["level" + data.spells.list[index].data.spellLevel].push(data.spells.list[index]);
        }

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

        //html.find('#diceTest').click(this._onDiceTestClick.bind(this));

        $(".abilityValue, .abilityName").click(function() {
            console.log(this);
            const words = $(this).parent().parent().find(".abilityValue span").attr('name').split('.');

            let r = new Roll("1d20");
            r.evaluate({ "async": false });
            var classDice = parseInt($(this).parent().parent().find(".abilityValue span").text()) >= r.total ? "success" : "fail";
            classDice = r.total == 1 ? 'successCrit' : r.total == 20 ? 'failCrit' : classDice;


            let chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                content: "Test de  " + CONFIG.naheulbeuk.ability[words[2]] + "(" + $(this).parent().parent().find(".abilityValue span").text() + ") <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
            };
            r.toMessage(chatData);
        });
    }

    // _onAbilityClick() {
    //     console.log(this);
    //     const words = $(this).parent().parent().find(".abilityValue span").attr('name').split('.');

    //     let r = new Roll("1d20");
    //     r.evaluate({ "async": false });
    //     var classDice = parseInt($(this).parent().parent().find(".abilityValue span").text()) >= r.total ? "success" : "fail";
    //     classDice = r.total == 1 ? 'successCrit' : r.total == 20 ? 'failCrit' : classDice;


    //     let chatData = {
    //         user: game.user.id,
    //         speaker: ChatMessage.getSpeaker(),
    //         content: "Test de  " + CONFIG.naheulbeuk.ability[words[2]] + "(" + $(this).parent().parent().find(".abilityValue span").text() + ") <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
    //     };
    //     r.toMessage(chatData);
    // }
}