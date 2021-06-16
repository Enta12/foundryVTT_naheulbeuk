export default class NaheulbeukItemSheet extends ItemSheet {
    get template() {
        console.log('TTTTTTTTTTTEST');
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
        console.log(data);
        return data;

    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

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


    }
}