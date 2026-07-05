export function makeQs(){
  const pool=getPool();
  const cocktails=pool.filter(x=>x.hasIngr&&x.ingr&&x.ingr.length>1);
  const allCats=[...new Set(RAW.map(x=>x.cat))];
  const res=[];

  // --- Ingredient questions (cocktails only) ---
  if(activeFilters.has("ingredients")){
    cocktails.forEach(item=>{
      // Type 1: which IS an ingredient
      const c1=item.ingr[Math.floor(Math.random()*item.ingr.length)];
      const w1=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i))).slice(0,3);
      if(w1.length>=3) res.push({qtype:"ingredients",img:IMAGES[item.name]||null,
        q:`¿Cuál de estos ingredientes lleva el ${item.name}?`,
        opts:sh([c1,...w1]),answer:c1,cat:item.cat,
        hint:`${item.name}: ${item.ingr.join(", ")}`});
      // Type 2: complete the recipe
      if(item.ingr.length>=3){
        const s=sh(item.ingr); const shown=s.slice(0,2),c2=s[2];
        const w2=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i))).slice(0,3);
        if(w2.length>=3) res.push({qtype:"ingredients2",img:IMAGES[item.name]||null,
          q:`El ${item.name} lleva ${shown.join(" y ")}… ¿cuál más?`,
          opts:sh([c2,...w2]),answer:c2,cat:item.cat,
          hint:`${item.name}: ${item.ingr.join(", ")}`});
      }
      // Type 3: which is NOT an ingredient
      if(item.ingr.length>=3){
        const intruder=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i)))[0];
        const decoys=sh(item.ingr).slice(0,3);
        if(intruder&&decoys.length>=3) res.push({qtype:"ingredients3",img:IMAGES[item.name]||null,
          q:`¿Cuál de estos NO lleva el ${item.name}?`,
          opts:sh([intruder,...decoys]),answer:intruder,cat:item.cat,
          hint:`${item.name} lleva: ${item.ingr.join(", ")}`});
      }
    });
  }

  // --- Price questions: one per serving format ---
  if(activeFilters.has("price")){
    pool.filter(item=>item.prices && item.prices.length && item.cat!==CLASICA_CAT).forEach(item=>{
      item.prices.forEach(serving=>{
        // Wrong options: other prices from the whole menu, excluding the correct value
        const wrongPs=sh(UNIQUE_PRICES.filter(p=>p!==serving.p)).slice(0,3);
        const allOpts=sh([serving.p,...wrongPs]).map(fmt);
        const hint_parts=item.prices.map(s=>`${s.label}: ${fmt(s.p)}`).join(" · ");
        res.push({qtype:"price",img:IMAGES[item.name]||null,
          q:`¿Cuánto cuesta el ${item.name} (${serving.label})?`,
          opts:allOpts, answer:fmt(serving.p), cat:item.cat,
          hint:`${item.name} — ${hint_parts}`});
      });
    });
  }


  // --- Category questions (only in "Todo" tab) ---
  if(activeFilters.has("category")&&activeTab==="Todo"){
    pool.forEach(item=>{
      const wrongCats=sh(allCats.filter(c=>c!==item.cat)).slice(0,3);
      res.push({qtype:"category",img:IMAGES[item.name]||null,
        q:`¿En qué sección está el ${item.name}?`,
        opts:sh([item.cat,...wrongCats]),answer:item.cat,cat:item.cat,
        hint:`${item.name} está en "${item.cat}"`});
    });
  }

  // --- Ratio questions (only for items with doses) ---
  if(activeFilters.has("ingredients")){
    const itemsWithDoses = pool.filter(x=>x.doses && Object.keys(x.doses).length>0);
    const allItemsWithDoses = RAW.filter(x=>x.doses && Object.keys(x.doses).length>0);

    // Helper: build a ratio string for an item
    function ratioStr(item){
      return item.ingr.map(ing=>{
        const dose = item.doses && item.doses[ing];
        return dose ? `${dose} ${ing}` : ing;
      }).join(", ");
    }

    itemsWithDoses.forEach(item=>{
      const correct = ratioStr(item);
      // Wrong options: ratio strings from other items with doses, or if not enough, shuffle doses of this item
      const otherRatios = sh(allItemsWithDoses.filter(x=>x.name!==item.name)).slice(0,3).map(ratioStr);
      // Pad with shuffled-dose variants if needed
      while(otherRatios.length < 3){
        const shuffledDoses = sh(Object.entries(item.doses||{}));
        const fake = item.ingr.map(ing=>{
          const dose = shuffledDoses.find(([k])=>k!==ing)?.[1];
          return dose ? `${dose} ${ing}` : ing;
        }).join(", ");
        if(fake !== correct) otherRatios.push(fake);
        else break;
      }
      if(otherRatios.length >= 1){
        res.push({qtype:"ratio", img:IMAGES[item.name]||null,
          q:`¿Cuál es el ratio del ${item.name}?`,
          opts:sh([correct,...otherRatios.slice(0,3)]), answer:correct, cat:item.cat,
          hint:`${item.name}: ${correct}`});
      }
    });
  }

  // --- Name questions (cocktails only — use ingredients as clue) ---
  if(activeFilters.has("name")){
    const cocktailItems = pool.filter(x=>x.hasIngr&&x.ingr);
    cocktailItems.forEach(item=>{
      // Try several random clue combos until we find one that uniquely
      // identifies this item among the pool (no other item shares ALL clue ingredients)
      let clue=null;
      const maxTries=8;
      for(let attempt=0; attempt<maxTries; attempt++){
        const size = item.ingr.length>=3 ? (Math.random()<0.5?2:3) : Math.min(2,item.ingr.length);
        const candidate = pick(item.ingr, size);
        const ambiguous = cocktailItems.some(other=>
          other.name!==item.name &&
          candidate.every(c=>other.ingr.includes(c))
        );
        if(!ambiguous){ clue=candidate; break; }
      }
      if(!clue) return; // couldn't find a unique clue — skip this item

      const wrongNames=sh(cocktailItems.filter(x=>x.name!==item.name)).slice(0,3).map(x=>x.name);
      if(wrongNames.length>=3) res.push({qtype:"name",img:IMAGES[item.name]||null,
        q:`¿Qué cóctel lleva ${clue.join(" y ")}?`,
        opts:sh([item.name,...wrongNames]),answer:item.name,cat:item.cat,
        hint:`${item.name}: ${item.ingr.join(", ")}`});
    });
  }

  return sh(res).slice(0,15);
}

export function genIngrQ(item){
  const types = sh(['ingredients','ingredients2','ingredients3']);
  for(const t of types){
    if(t==='ingredients'){
      const required = item.ingr.filter(i=>!item.optional || !item.optional.includes(i));
      if(required.length===0) continue;
      const correct=required[Math.floor(Math.random()*required.length)];
      const wrongs=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i))).slice(0,3);
      if(wrongs.length>=3) return {qtype:t,
        q:`¿Cuál de estos ingredientes lleva el ${item.name}?`,
        opts:sh([correct,...wrongs]),answer:correct,
        hint:`${item.name}: ${item.ingr.join(", ")}`};
    }
    if(t==='ingredients2' && item.ingr.length>=3){
      const required = item.ingr.filter(i=>!item.optional || !item.optional.includes(i));
      if(required.length<3) continue;
      const s=sh(required); const shown=s.slice(0,2),c2=s[2];
      const wrongs=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i))).slice(0,3);
      if(wrongs.length>=3) return {qtype:t,
        q:`El ${item.name} lleva ${shown.join(" y ")}… ¿cuál más?`,
        opts:sh([c2,...wrongs]),answer:c2,
        hint:`${item.name}: ${item.ingr.join(", ")}`};
    }
    if(t==='ingredients3' && item.ingr.length>=3){
      const intruder=sh(ALL_INGRS.filter(i=>!item.ingr.includes(i)))[0];
      const decoys=sh(item.ingr).slice(0,3);
      if(intruder&&decoys.length>=3) return {qtype:t,
        q:`¿Cuál de estos NO lleva el ${item.name}?`,
        opts:sh([intruder,...decoys]),answer:intruder,
        hint:`${item.name} lleva: ${item.ingr.join(", ")}`};
    }
  }
  return null;
}

export function genPriceQ(item){
  if(!item.prices || !item.prices.length) return null;
  const serving = item.prices[Math.floor(Math.random()*item.prices.length)];
  const wrongPs = sh(UNIQUE_PRICES.filter(p=>p!==serving.p)).slice(0,3);
  if(wrongPs.length<3) return null;
  const hint_parts = item.prices.map(s=>`${s.label}: ${fmt(s.p)}`).join(" · ");
  return {qtype:'price',
    q:`¿Cuánto cuesta el ${item.name} (${serving.label})?`,
    opts:sh([serving.p,...wrongPs]).map(fmt),answer:fmt(serving.p),
    hint:`${item.name} — ${hint_parts}`};
}

export function genRatioQ(item){
  if(!item.doses || Object.keys(item.doses).length===0) return null;
  const allWithDoses = RAW.filter(x=>x.doses && Object.keys(x.doses).length>0);
  function ratioStr(x){ return x.ingr.map(i=>(x.doses&&x.doses[i])?`${x.doses[i]} ${i}`:i).join(', '); }
  const correct = ratioStr(item);
  const wrongs = sh(allWithDoses.filter(x=>x.name!==item.name)).slice(0,3).map(ratioStr);
  if(wrongs.length<1) return null;
  return {qtype:'ratio',
    q:`¿Cuál es el ratio del ${item.name}?`,
    opts:sh([correct,...wrongs.slice(0,3)]), answer:correct,
    hint:`${item.name}: ${correct}`};
}
