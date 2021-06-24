export default class NaheulbeukItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }
    get template() {
        return `systems/naheulbeuk/templates/sheets/${this.item.data.type}-sheet.hbs`;
    }


    getData() {
        // Retrieve base data structure.
        const data = super.getData();

        // Grab the item's data.
        const itemData = data.data;

        // Re-define the template data references.
        data.item = itemData;
        data.data = itemData.data;
        data.config = CONFIG.naheulbeuk;

        return data;

    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        html.find('#diceTest').click(this._onDiceTestClick.bind(this));
        html.find('#diceDamage').click(this._onDiceDamageClick.bind(this));
        html.find('#diceDamageWeapon').click(this._onDiceDamageClick.bind(this));
        html.find('#diceAttackWeapon').click(this._onDiceAttackWeaponClick.bind(this));
        html.find('#diceParadeWeapon').click(this._onDiceParadeWeaponClick.bind(this));
    }
    _onDiceDamageClick() {
        console.log("dice damage weapon");
        let impact = this.item.data.data.checkPI ? this.item.actor.data.data.abilities.PI.total : 0;
        let damageSpell = this.item.data.data.checkPS ? this.item.actor.data.data.abilities.PS.total : 0;

        let str = $("#diceDamageInput").val();
        console.log(str + " " + this.item.data.data.checkPI + " " + this.item.actor.data.data.abilities.PI.total);
        let r = new Roll(str + " + @PI + @PS", { PI: impact, PS: damageSpell });
        r.evaluate({ "async": false });
        r.toMessage();
    }

    _onDiceAttackWeaponClick() {

        let valueStats = this.item.actor.data.data.abilities.AT.total;
        let r = new Roll("1d20");
        r.evaluate({ "async": false });

        var str = this.item.data.data.modAT < 0 ? '' : '+';
        var classDice = (parseInt(valueStats) + parseInt(this.item.data.data.modAT)) >= r.total ? "success" : "fail";

        if (r.total == 1)
            classDice = 'successCrit';
        if (r.total == 20)
            classDice = 'failCrit';

        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker(),
            content: "Test de  AT (" + valueStats + " " + str + this.item.data.data.modAT + " ) <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
        };


        r.toMessage(chatData);
    };
    _onDiceParadeWeaponClick() {

        let valueStats = this.item.actor.data.data.abilities.PRD.total;
        let r = new Roll("1d20");
        r.evaluate({ "async": false });

        var str = this.item.data.data.modPRD < 0 ? '' : '+';
        var classDice = (parseInt(valueStats) + parseInt(this.item.data.data.modPRD)) >= r.total ? "success" : "fail";

        if (r.total == 1)
            classDice = 'successCrit';
        if (r.total == 20)
            classDice = 'failCrit';

        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker(),
            content: "Test de PRD (" + valueStats + " " + str + this.item.data.data.modPRD + " ) <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
        };

        r.toMessage(chatData);
    };

    _onDiceTestClick() {

        let valueStats = this.item.actor.data.data.abilities[this.item.data.data.testWith].total;
        let r = new Roll("1d20");
        r.evaluate({ "async": false });

        var str = this.item.data.data.testMod < 0 ? '' : '+';
        var classDice = (parseInt(valueStats) + parseInt(this.item.data.data.testMod)) >= r.total ? "success" : "fail";

        if (r.total == 1)
            classDice = 'successCrit';
        if (r.total == 20)
            classDice = 'failCrit';

        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker(),
            content: "Test de  " + this.item.data.data.testWith + "(" + valueStats + " " + str + this.item.data.data.testMod + " ) <div class='diceChatRoll " + classDice + "'>" + r.total + "</div>"
        };


        r.toMessage(chatData);
    };
}