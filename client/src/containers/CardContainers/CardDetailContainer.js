import cardOverview from '../../components/App/Card/CardDetail'
import { connect } from 'react-redux';
import { failedActionUpdateCardName } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'
import CardDetail from '../../components/App/Card/CardDetail';

const mapStateToProps = (state, ownProps) => {
    return {
        card: {
            checklists: [{
                title: "Super checklist",
                items: [{
                    name: "Breathe",
                    isChecked: false

                }, {
                    name: "Live",
                    isChecked: true

                }]
            },
            {
                title: "Super checklist 2",
                items: [{
                    name: "Breathe",
                    isChecked: false
                }, {

                    name: "Live",
                    isChecked: true

                }]
            }], duedate: "Dimanche", desc: "Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti.", isArchived: false, labels: [{ name: "Hot", color: "#f44242" }], comments: [], members: [], attachments: [{ name: "File.file", dateadded: "hier", url: "https://cdn3.iconfinder.com/data/icons/alicons/32/multiple_files-512.png" }, { name: "File2.file", dateadded: "hier", url: "https://cdn3.iconfinder.com/data/icons/alicons/32/multiple_files-512.png" }], watchers: [], _id: "5bccbc2b05f091056f7cfb84", name: 'allo', list: "5bcca38415f20303bf261a1c", createdAt: new Date("Sun, 21 Oct 2018 17:49:31 GMT"), updatedAt: new Date("Sun, 21 Oct 2018 17:49:31 GMT"), __v: 0
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async fetchCard(cardId){

        },
        async updateName(cardId, name) {
            try {
                await cardServices.updateCardNameApi(this.props.match.params.cardId, name)
            } catch (error) {
                console.log(error)
                return dispatch(failedActionUpdateCardName(error))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail);