import { naheulbeuk } from "./module/config.js"
import NaheulbeukActor from "./module/actors/entity.js";
import NaheulbeukItemSheet from "./module/actors/sheets/NaheulbeukItemSheet.js";
import NaheulbeukNamedCharacterSheet from "./module/actors/sheets/NaheulbeukNamedCharacterSheet.js";
import NaheulbeukNamedNPCSheet from "./module/actors/sheets/NaheulbeukNamedNPCSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/naheulbeuk/templates/partials/character-information-sheet.hbs",
        "systems/naheulbeuk/templates/partials/npc-information-sheet.hbs",
        "systems/naheulbeuk/templates/partials/character-spell-book.hbs",
        "systems/naheulbeuk/templates/partials/character-settings-sheet.hbs",
        "systems/naheulbeuk/templates/partials/character-skills-sheet.hbs",
        "systems/naheulbeuk/templates/partials/character-bags-sheet.hbs",
        "systems/naheulbeuk/templates/cards/spell-book-card.hbs",
        "systems/naheulbeuk/templates/cards/skill-book-card.hbs",
        "systems/naheulbeuk/templates/cards/object-bag-card.hbs"
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

    game.naheulbeuk = {
        NaheulbeukActor
    };
    CONFIG.naheulbeuk = naheulbeuk;

    
    CONFIG.Actor.documentClass = NaheulbeukActor;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("naheulbeuk", NaheulbeukItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("naheulbeuk", NaheulbeukNamedNPCSheet, {
        types: [
            "npc"
        ],
        makeDefault: true,
        label: "naheulbeuk.SheetClassNPC"
      });
    
    Actors.registerSheet("naheulbeuk", NaheulbeukNamedCharacterSheet, {
        types: [
            "heros",
            "wizard",
            "monster",
            "boss"
        ],
        makeDefault: false,
        label: "naheulbeuk.SheetClassCharacters"
    });

    preloadHandlebarsTemplates();

    
});