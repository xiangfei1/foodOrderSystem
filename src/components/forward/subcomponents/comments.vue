<template>
    <div class="comments">
        <!-- <div class="report">
            <h3 class="r-title">发表评论</h3>
            <textarea name=""  placeholder="如果您喜欢这道菜的话，记得好评哟" cols="88" rows="4"></textarea>
            <el-button type="primary" class="button" plain @click="toComment()">点击发表</el-button>
        </div> -->
        <div class="cmt-list" v-if="cmtInfo.length!=0">
            <div class="cmt-item" v-for="(item,index) in cmtInfo" :key="index">
                <div class="cmt-title">第{{index+1}}楼 &nbsp;&nbsp;&nbsp;&nbsp;用户： {{item.cname}} <span style="float: right;">发表时间：{{item.cTime | dateFormat}}</span> </div>
                <div class="cmt-body">{{ item.content }}</div>
            </div>
        </div>
        <div class="other" v-else>
            <h4>该商品暂无评论</h4>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.gID,
            cmtInfo: [],
        }
    },
    mounted(){
        this.getComment()
    },
    methods: {
        getComment(){
            let gID = this.id
            this.$http.post('/api/comment',{gID}).then(resp=>{
                if(resp.status == 200) {
                    this.cmtInfo = resp.body
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .comments {
        height: 450px;
        .report {
            height: 90px;
            width: 900px;
            // border: 1px solid black;
            .r-title {
                width: 120px;
                height: 90px;
                text-align: center;
                display: inline-block;
                line-height: 90px;
                vertical-align: top;
            }
            textarea {
                text-indent: 2em;
                padding: 10px 10px;
                box-sizing: border-box;
                display: inline-block;
            }
            .button {
                vertical-align: top;
                margin-top: 25px;
            }
        }
        .cmt-list {
            width: 900px;
            height: 300px;
            overflow-y: auto;
            .cmt-item {
                font-size: 14px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 30px;
                    text-indent: 2em;
                }
            }
        }
        .other {
            margin: 20px auto 0;
            width: 300px;
        }
    }
</style>