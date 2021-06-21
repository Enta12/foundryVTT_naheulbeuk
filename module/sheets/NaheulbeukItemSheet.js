export default class NaheulbeukItemSheet extends ItemSheet {
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
        // console.log(this.getFlag("naheulbeuk", "STR"));
        console.log(this.getData().options)
            // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        $("#spellDescription button").click(function() {
            $("#spellDescription .active").attr('disabled', false)
            $("#spellDescription .active").removeClass("active");

            $(this).attr('disabled', true);
            $(this).addClass("active");
        });

        $("#buttonDescription").click(function() {
            $("#description").show();
            $("#effect").hide();
            $("#note").hide();
            $("#settingsSpells").hide();
        });

        $("#buttonEffect").click(function() {
            $("#effect").show();
            $("#description").hide();
            $("#note").hide();
            $("#settingsSpells").hide();
        });

        $("#buttonNote").click(function() {
            $("#note").show();
            $("#effect").hide();
            $("#description").hide();
            $("#settingsSpells").hide();
        });
        $("#buttonSettings").click(function() {
            $("#settingsSpells").show();
            $("#note").hide();
            $("#effect").hide();
            $("#description").hide();
        });
        html.find('#diceTest').click(this._onDiceTestClick.bind(this));
        html.find('#diceDamage').click(this._onDiceDamageClick.bind(this));
        html.find('#diceWeapon').click(this._onDiceDamageClick.bind(this));



    }
    _onDiceDamageClick() {
        console.log(this.item.data);
        let impact = this.item.data.data.checkPI ? this.item.actor.data.data.abilities.PI.total : 0;
        let damageSpell = this.item.data.data.checkPS ? this.item.actor.data.data.abilities.PS.total : 0;

        let r = new Roll($("#diceDamageInput").val() + " + @PI + @PS", { PI: impact, PS: damageSpell });
        r.evaluate({ "async": false });
        r.toMessage();
    }
    _onDiceTestClick() {

        let valueStats = 0;
        switch (this.item.data.data.testWith) {
            case 'AT':
                valueStats = this.item.actor.data.data.abilities.AT.total;
                break;
            case 'PRD':
                valueStats = this.item.actor.data.data.abilities.PRD.total;
                break;
            case 'COU':
                valueStats = this.item.actor.data.data.abilities.COU.total;
                break;
            case 'ADR':
                valueStats = this.item.actor.data.data.abilities.ADR.total;
                break;
            case 'CHA':
                valueStats = this.item.actor.data.data.abilities.CHA.total;
                break;
            case 'FO':
                valueStats = this.item.actor.data.data.abilities.FO.total;
                break;
            case 'INT':
                valueStats = this.item.actor.data.data.abilities.INT.total;
                break;
            case 'MagPSY':
                valueStats = this.item.actor.data.data.abilities.MagPSY.total;
                break;
            case 'MagPHY':
                valueStats = this.item.actor.data.data.abilities.MagPHY.total;
                break;
            case 'ReMag':
                valueStats = this.item.actor.data.data.abilities.ReMag.total;
                break;

        }

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