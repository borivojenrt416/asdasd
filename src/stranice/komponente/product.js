import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {dodajUKorpu,vratiBroj} from '../../actions/dodajUKorpu'
import './product.scss'
class Product extends Component{
    constructor(props){
        super(props);
    
        this.state={
                objekat:null
        }
    }
    componentWillUpdate(prevProps){

        if(this.props.match.params.id!==prevProps.match.params.id)
        {
           fetch(`http://localhost:4000/korisnici/proizvod/${prevProps.match.params.id}`)
        .then(response=>response.json())
        .then(vrati=>{
            this.setState({
                objekat:vrati.data[0]
            })
        })
        }}
    componentWillMount(){
        console.log(this.props.match.params.id)
        fetch(`http://localhost:4000/korisnici/proizvod/${this.props.match.params.id}`)
        .then(response=>response.json())
        .then(vrati=>{
            this.setState({
                objekat:vrati.data[0]
            })
        })
    }
    // componentDidMount(){
    //     console.log('props',this.props)
    //     console.log(this.props.match.params.id)
    //     var trazeniID = this.props.match.params.id
    //     var objekat=null;
    //     console.log(this.state.products)
    //     console.log(trazeniID)
    //     for(let i=0;i<this.state.products.length;i++)
    //     {
    //        console.log(this.state.products[i])
    //        for(let j=0;j<this.state.products[i].data.length;j++)
    //        {
    //         //    console.log(this.state.products[i].data[j])
    //             if(this.state.products[i].data[j].id===trazeniID)
    //             objekat = this.state.products[i].data[j]
    //        }
    //     }

    //     console.log(objekat)
    //   this.setState({
    //       obj:objekat
    //   })
    // }
    
dodaj=()=>{
    this.props.dodajUKorpu(this.state.objekat,this.props.korpa)
    this.props.vratiBroj(this.props.korpa)

}
render(){

    console.log(this.state.objekat)

    if(this.state.objekat!==undefined&&this.state.objekat!==null)
    {
    return(
<div className="proizvod">
    <div className="levaStrana">
    <p className="nazivpr">
        {this.state.objekat.naziv}
        </p>
    <div className="img">
        <img src={this.state.objekat.img} />
    </div>
    </div>
    <div className="desnaStrana">
        <p><span id="besplatno">Opis proizvoda : </span> {this.state.objekat.opis}</p>
        <p><span id="besplatno">Cena proizvoda : </span> {this.state.objekat.cena}<span>RSD</span></p>
        <hr/>
        <h1><i class="fas fa-truck"></i></h1>
                <p><span id="besplatno">BESPLATNA ISPORUKA</span> na teritoriji cele SRBIJE svakim radnim danom</p>
                <hr/>
                <div className="dugmesredina">
                <button type="submit" className="kupi" id={this.state.objekat.naziv} onClick={this.dodaj}>DODAJ U KORPU<span id="korpa"><i class="fas fa-cart-plus"></i></span></button>
                </div>   </div>
</div>
    );
    }
  else
  {
      return(
        <div className="nema">
        <p>Poštovani korisniče, trenutno nemamo traženi proizvod u bazi!</p>
        <p>Molimo Vas da se<Link className="n" to="/"> vratite na početnu stranu. </Link>Hvala</p>
        </div>)
  }
}
}
const mapStateToProps = state =>({
    korpa:state.korpa.korpa
   })

export default connect(mapStateToProps,{dodajUKorpu,vratiBroj})(Product);