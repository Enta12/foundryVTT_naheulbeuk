//import NaheulbeukActor from "../entity.js"; 


export default class ActorSheetNaheulbeuk extends ActorSheet {

  


    //TODO
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          template: "systems/naheulbeuk/templates/sheets/namedNPC-sheet.hbs",
          classes: ["naheulbeuk", "sheet", "namedNPC"],
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

      $(".damage").click(function() {
          const value = $(".attr.PI").val();
          console.log("value", value)
          let roll = new Roll('1d6+6');
          roll.evaluate({ "async": false });
          const PI = roll._total

          let chatData = {
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              content: "<h1>Dégats de ARME</h1> <div class='diceChatRoll'>" + PI + "</div>"
          };
          roll.toMessage(chatData);
      });

      $(".abilityName").click(function() {
          const ability = $(this).attr("name");
          const value = $(`.attr.${ability}`).val();
          let roll = new Roll("1d20");
          roll.evaluate({ "async": false });
          const rollValue = roll._total
          var classDice = value >= rollValue ? "success" : "fail";
          classDice = rollValue === 1 ? 'successCrit' : rollValue === 20 ? 'failCrit' : classDice;

          let chatData = {
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              content: "<h1>Test de  " + ability + " sur " + value + "</h1> <div class='diceChatRoll " + classDice + "'>" + rollValue + "</div>"
          };
          roll.toMessage(chatData);
      });
  }
}
