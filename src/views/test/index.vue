<template>
  <div class="components-container">
<!--     <div class="raw">
      <el-tree
      :data="treeData"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="data.isEdit" >
            <el-input
              class="input-new-tag"
              v-model="data.label"
              ref="node"
              size="small"
              @keyup.enter.native="handleNodeConfirm(data)"
              @blur="handleNodeConfirm(data)"
            >
            </el-input>
            </span>
            <span v-else>{{node.label}}</span>

        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            在此节点下新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除此节点
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(node, data)">
            编辑此节点
          </el-button>

        </span>
      </span>
    </el-tree>
    </div> -->
    <div class="raw">
    <el-tag
      :key="tag"
      v-for="tag in proceData"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 操作</el-button>
    </div>


    <el-table  ref="dataTable" :data="tableData" :span-method="objectSpanMethod" @cell-dblclick="cellDbClick" @row-contextmenu="rowContextmenu" border  stripe>

        <el-table-column v-for="index in treeDataLength"   align="center" :label="'对象序号'+index" width="80">
        <template slot-scope="scope">
<!--           <span>{{scope.row[index-1].label}}</span> -->

          <template v-if="scope.row[index-1].isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row[index-1].label"  @keyup.enter.native="editToTree(scope.row[index-1])"></el-input>
          </template>
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover" 
            v-else>
              <div style="text-align: right; margin: 0">

                <el-button type="primary" icon="el-icon-edit" circle @click="scope.row[index-1].isEdit=!scope.row[index-1].isEdit"></el-button>
                <el-button type="success" icon="el-icon-plus" circle @click="appendToTree(scope.row[index-1].id)"></el-button>
<!--                 <el-button type="warning" icon="el-icon-tickets" circle @click="appendToTree(scope.row[index-1].id)"></el-button>
                <el-button type="info" icon="el-icon-document" circle @click="appendToTree(scope.row[index-1].id)"></el-button> -->
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteFromTree(scope.row[index-1].id)"></el-button>
              </div>
            <el-button type="text" slot="reference">{{scope.row[index-1].label}}</el-button>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-for="index in proceData.length"  align="center" :label="proceData[index-1]" width="80">
        <template slot-scope="scope">
            <template v-if="scope.row[treeDataLength+index-1].isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row[treeDataLength+index-1].label"  @keyup.enter.native="scope.row[treeDataLength+index-1].isEdit=!scope.row[treeDataLength+index-1].isEdit"></el-input>
  
          </template>
          <span v-else @click="scope.row[treeDataLength+index-1].isEdit=!scope.row[treeDataLength+index-1].isEdit">{{ scope.row[treeDataLength+index-1].label }}</span>
        </template>
      </el-table-column>
    </el-table>

<!-- 
     <el-table :data="tableConnect"  border fit highlight-current-row style="width: 100%">

        <el-table-column  align="center" label="级别" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
        </template>
      </el-table-column>


      <el-table-column  align="center" label="前序连接词" width="80">
        <template slot-scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.prefix" @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit">></el-input>
          </template>
          <span v-else  @click="scope.row.isEdit=!scope.row.isEdit">{{ scope.row.prefix }}</span>
        </template>
      </el-table-column>

      <el-table-column  align="center" label="后序连接词" width="80">
        <template slot-scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input class="edit-input" size="small" v-model="scope.row.postfix"  @keyup.enter.native="scope.row.isEdit=!scope.row.isEdit"></el-input>
  
          </template>
          <span v-else @click="scope.row.isEdit=!scope.row.isEdit">{{ scope.row.postfix }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isEdit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-else type="primary" @click='scope.row.isEdit=!scope.row.isEdit' size="small" icon="el-icon-edit">编辑</el-button>
        </template>
      </el-table-column>

    </el-table> -->
   
  </div>
</template>

<script>
 let id = 1000;


export default {
  name: 'testCaseGen',
  data() {

    const constData = [{
        id: 1,
        label: '时间域1',
        isEdit:false,
        children: [{
          id: 4,
          label: '父对象1',
          isEdit:false,
          children: [{
            id: 9,
            label: '子对象1',
            isEdit:false,
            children: []
          },{
            id: 10,
            label: '子对象2',
            isEdit:false,
            children: []
          }]
        }]
      },{
        id: 101,
        label: '时间域2',
        isEdit:false,
        children: []
      },{
        id: 102,
        label: '时间域3',
        isEdit:false,
        children: []
      }];

    return {

      treeDataLength:0,
      treeDataLengthOld:0,
      proceDataLenthOld:0,
      tableData:new Array(),
      treeTableData:new Array(),
      proceTableData:new Array(),
      treeData: JSON.parse(JSON.stringify(constData)),

      tableConnect:new Array(),

      proceData: ['操作1'],
      inputVisible: false,
      inputValue: ''

    }
  },
  created() {


            this.getTreeTableData();
            //build proceTableData end
            this.getProceTableData();
            this.proceDataLenthOld =this.proceData.length;
            this.proceDataOld= Object.assign([], this.proceData);
            this.getTableData();
  },

  watch: {
    treeDataLength:function(newVa,oldVa){
        if(newVa>this.treeDataLengthOld){
            for(var i=this.treeDataLengthOld;i<newVa;i++){
              this.tableConnect.push({level:'对象序号'+(i+1),prefix:'',postfix:'',isEdit:false});
            }
        }else{
            for(var i=this.treeDataLengthOld;i>newVa;i--){
              this.tableConnect.pop();
            }
        }
    },
    treeData: {
        handler:function(newVa,oldVa){
          this.getTreeTableData();
          this.getProceTableData();
          this.getTableData();
        },
        deep:true
    },
    proceData:{

        handler:function(newVa,oldVa){
          var diff=this.getArrDiff(newVa,this.proceDataOld);

          //增加
          if(newVa.length>this.proceDataLenthOld){  
            this.proceTableData.forEach(value=>{
              for(var i=this.proceDataLenthOld;i<newVa.length;i++){
                value.push({label:diff[0],isEdit:false});
              }
           });   
          }
          //减少
          else{  
            var index=this.proceDataOld.indexOf(diff[0]);
            this.proceTableData.forEach(value=>{
              value.splice(index,1);
            })
          }
          this.getTableData();
          this.proceDataOld= Object.assign([], newVa);
          this.proceDataLenthOld=newVa.length;
                    
        },
        deep:true
    }
   },
   methods: {

    getNodeFromOneTree(treeHeader,id){
          if(treeHeader.id == id){
                  return treeHeader;
             }else if (treeHeader.children!=undefined&&treeHeader.children.length!=0){
                  var result = null;
                  for(var j=0; result == null && j < treeHeader.children.length; j++){
                       result = this.getNodeFromOneTree(treeHeader.children[j], id);
                  }
                  return result;
             }
             return null;
    },
    getNodeFromTree(id){
      var treeData=this.treeData;
      var result = null;
      for(var i=0;result==null&&i<treeData.length;i++){
          result=this.getNodeFromOneTree(treeData[i],id)
      }
      return result;
    },

    getParentFromOneTree(treeHeader,id){

             const index = treeHeader.children.findIndex(d => d.id === id);
             if(index!=-1){
              return {parent:treeHeader,index:index};
             }else{
              var result=null;
              for(var j=0; result==null&&j<treeHeader.children.length;j++){
                    result = this.getParentFromOneTree(treeHeader.children[j], id);
              }
              return result;
             }
             return null;
    },
    deleteFromTree(nodeid){
      var treeData=this.treeData;
      var index=treeData.findIndex(d=>d.id===nodeid);
      if(index!=-1){
        treeData.splice(index, 1);
      }else{
        var nodeParent=null;
        for(var i=0;nodeParent==null&&i<treeData.length;i++){
            var nodeParent=this.getParentFromOneTree(treeData[i],nodeid)
          }
        nodeParent.parent.children.splice(nodeParent.index,1);
      }
    },
    appendToTree(nodeid){
      var curnode=this.getNodeFromTree(nodeid);
      const newChild = { id: id++, label: '新增对象'+id,isEdit:false, children: [] };
        if (!curnode.children) {
          this.$set(curnode, 'children', []);
        }
        curnode.children.push(newChild);
    },
    editToTree(node){
      node.isEdit=!node.isEdit;
      var curnode=this.getNodeFromTree(node.id);
      curnode.label=node.label;
    },
    append(data) {
        const newChild = { id: id++, label: '新增对象'+id,isEdit:false, children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

    remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
    edit(node,data){
        data.isEdit=true;

    },

    renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span v-if="node.isEdit" >
            <el-input
              class="input-new-tag"
              v-model="node.label"
              ref="node"
              size="small"
            >
            </el-input>
            </span>
            <span v-else>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>新增</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
              <el-button size="mini" type="text" on-click={ () => this.edit(node, data) }>编辑</el-button>
            </span>
          </span>);
      },
    printPaths(node)  
    { 
        var path=[];
        this.printPathsRecur(node, path, 0); 
    }, 
   
    /* Recursive helper function -- given a node, and an array 
       containing the path from the root node up to but not  
       including this node, print out all the root-leaf paths.*/
    printPathsRecur(node, path, pathLen)  
    { 
        if (node == null) 
            return; 
   
        /* append this node to the path array */
        path[pathLen] = {id:node.id,label:node.label,isEdit:node.isEdit};
        pathLen++; 
   
        /* it's a leaf, so print the path that led to here  */
        if (node.children==undefined||node.children.length==0){ 
            this.printArray(path); 
            if(this.treeDataLength==0){
              this.treeDataLength=pathLen;
            }else{
              if(this.treeDataLength<pathLen){
                this.treeDataLength=pathLen;
              }
            }
        }else 
        { 
            /* otherwise try both subtrees */
            for(var i=0;i<node.children.length;i++){
              this.printPathsRecur(node.children[i],path,pathLen);
              //将path  pathlen 之后的内容都清除！
              path=path.slice(0,pathLen);
            }
        } 
    }, 
    /* Utility function that prints out an array on a line. */
    printArray(path)  
    { 
       const tempPath = Object.assign([], path);
       this.treeTableData.push(tempPath);
       path=[];
    },

    handleNodeConfirm(data) {
      let inputValue = this.inputValue;
      data.isEdit=false;
    },
    getTableData(){
        this.tableData= this.treeTableData.map((value,index)=>{
              return this.treeTableData[index].concat(this.proceTableData[index]);
           }); 
    },
    getProceTableData(){
        this.treeTableData.forEach((tvalue,tindex)=>{
            var proceTableRowArray=[];
            this.proceData.forEach((pvalue,pindex)=>{
              var proceCellData={label:pvalue,isEdit:false};
              proceTableRowArray.push(proceCellData);
            });
          var temp = Object.assign([], proceTableRowArray);
          this.proceTableData.push(temp);   //保留一个操作表的内容，方便前面修改
          proceTableRowArray=[];
        });
    },
    getTreeTableData(){
        this.treeTableData=[];
        this.treeDataLengthOld=this.treeDataLength;
        this.treeDataLength=0;
        this.treeData.forEach((value)=>{
          this.printPaths(value) 
        })
        this.treeTableData.forEach(value=>{
          if(value.length<this.treeDataLength)
            var len=this.treeDataLength-value.length;
            for(var i=0;i<len;i++){
              var newChild = { id: id++, label: '',isEdit:false, children: [] };
              value.push(newChild);
            }
        })
    },

    getArrDiff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
    },

    getTreeData(treeTableData,retTree,columnIndex,startRow,endRow){
        if(treeTableData.length==0) return;
        var retTree = arguments[1] ? arguments[1] : [];//设置参数retTree的默认值为[]
        var columnIndex = arguments[2] ? arguments[2] : 0;//设置参数columnIndex的默认值为[]
        var startRow = arguments[3] ? arguments[3] : 0;//设置参数startRow的默认值为[]
        var endRow = arguments[4] ? arguments[4] : treeTableData.length;//设置参数endRow的默认值为[]



        var retLengthArray=[];
        var sameLength=startRow+1;
        while(sameLength<endRow){
            while(treeTableData[startRow][columnIndex].id==treeTableData[sameLength][columnIndex].id){
              sameLength++;
            }
            retLengthArray.push({startRow:startRow,endRow:sameLength});
            retTree.push({
                          id: treeTableData[startRow][columnIndex].id, 
                          label: treeTableData[startRow][columnIndex].label,
                          isEdit:false, 
                          children: [] 
                        });
            startRow=sameLength;
            sameLength=startRow+1;
            if(startRow==endRow-1){
              retLengthArray.push({startRow:startRow,endRow:sameLength});
              retTree.push({
                          id: treeTableData[startRow][columnIndex].id, 
                          label: treeTableData[startRow][columnIndex].label,
                          isEdit:false, 
                          children: [] 
                        });
            }
          }
          if(columnIndex<this.treeDataLength-1){
              for(var i=0;i<retLengthArray.length;i++){
                  this.getTreeData(treeTableData,retTree[i].children,columnIndex+1,retLengthArray[i].startRow,retLengthArray[i].endRow);
                }
          }
          return retTree
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // var treeTableData= Object.assign([], this.treeTableData);
      // var tree=[];
      // tree=this.getTreeData(treeTableData);
        if(columnIndex>this.treeDataLength-1){
          return {
              rowspan: 1,
              colspan: 1
            };
        }

        if(rowIndex!=0){
          if(row[columnIndex].id==this.tableData[rowIndex-1][columnIndex].id){
            return [0,0]
          }
        }
        var sameLength=1;
        while((rowIndex+sameLength)<this.tableData.length&&row[columnIndex].id==this.tableData[rowIndex+sameLength][columnIndex].id){
          sameLength++;
        }
        return [sameLength,1];

    },
    cellDbClick(row, column, cell, event){
        var a=1;
    },
    rowContextmenu(row,event){
      var a=1;
    },





    handleClose(tag) {
      this.proceData.splice(this.proceData.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.proceData.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },



    //前序词，后序词 start
    confirmEdit(row) {
      row.isEdit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    cancelEdit(row){
      row.isEdit=false;
    }
    //前序词，后序词 end




  }

}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
.raw{
  float:left;
  margin-right: 100px;
}

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>


