<template>
    <div v-if="guncellencekItem" class="submit-form">
        <div class="form-group">
            <label for="userId" >UserId : </label>
            <input type="text" 
            class="form-control"
             id="userId" required 
             v-model="guncellencekItem.userId"
             name="userId" />
        </div>
        <div class="form-group">
            <label for="title" >Title : </label>
            <input type="text" 
            class="form-control"
             id="title" 
              v-model="guncellencekItem.title"
            required name="title" />
        </div>
        <br />
        <button class="btn btn-success" @click="itemGuncelle">Güncelle </button>
         <button class="btn btn-danger"  @click="itemSil" >Sil </button>
    </div>
</template>
<script>
import CommerceDataService from "../services/CommerceDataService"
export default {
    name : "item-detail",
    data(){
        return{
            guncellencekItem : null,
        }
    },
    methods: {
      itemDetayGetir(id){
        CommerceDataService.getItemDetail(id).then(gelenItem => {
            //{"id":id,"title":"testtest","description":"testtestdesc","published":false}
            this.guncellencekItem = gelenItem.data;
        })
      },

      itemGuncelle()
      {
       
        CommerceDataService.updateItem(this.guncellencekItem.id,this.guncellencekItem)
        .then(guncellenmisItem => {
            console.log(guncellenmisItem.data);
            this.$router.push({ name: "home" });
        }).catch(hata => {
            console.log("hata oluştu : " +hata);
        });
      },
       itemSil()
      {
        {
        if(confirm("Silmek istediğinizden emin misiniz?") == true){
            CommerceDataService.deleteItem(this.guncellencekItem.id)
            .then(response => {
            console.log(response);
           // this.$router.push({ name: "todos" });
        });
        }else{
            console.log("Silme gerçekleşmedi")
        }

    }
      }

    },
    mounted() {
        //bana bir önceki yani tutoriaListteki tıklamış olduğum tutorial ın id si gelecek
        this.itemDetayGetir(this.$route.params.id);
    }
    
}
</script>