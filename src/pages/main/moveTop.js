return(i=Object.assign({method:"GET"},i))
.query=Object.assign({page:t,perPage:e},i.query),
this.client.send(this.baseCrudPath,i)
.then(r=>{var n;return r.items=((n=r.items)==null?void 0:n.map(s=>this.decode(s)))||[],r})}