import { naheulbeuk } from "./module/config.js"
import NaheulbeukItemSheet from "./module/sheets/NaheulbeukItemSheet.js";
import NaheulbeukNamedCharacterSheet from "./module/sheets/NaheulbeukNamedCharacterSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/naheulbeuk/templates/partials/character-information-sheet.hbs",
        "systems/naheulbeuk/templates/partials/character-spell-book.hbs",
        "systems/naheulbeuk/templates/partials/character-settings-sheet.hbs",
        "systems/naheulbeuk/templates/cards/spell-book-card.hbs"


    ];
    return loadTemplates(templatePaths);
}


Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
Handlebars.registerHelper('getLength', function(obj) {
    return obj.length;
});

Handlebars.registerHelper('translationHelper', function(typeName, str) {
    return game.i18n.localize(naheulbeuk[typeName][str]);
});



console.log("NAHEULBEUK | naheulbeuk.js load");

Hooks.once('init', async function() {
    console.log("Donjon de naheulbeuk | Initialising naheulbeuk system");

    CONFIG.naheulbeuk = naheulbeuk;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("naheulbeuk", NaheulbeukItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("naheulbeuk", NaheulbeukNamedCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();

});