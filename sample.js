(Object.entries(invitations).map(([orgName, invitation]) => 
                <div 
                key={invitation.orgName}
                style={{display: 'flex', justifyContent: 'space-evenly',padding: '10px'}}>
                    <p>{invitation.orgName}</p>
                    <button
                        type="button" 
                        value={invitation.orgName}
                        onClick={this.handleAccept}
                        >Accept
                    </button>
                    <button
                        type="button" 
                        value={invitation.orgName}
                        onClick={this.handleDecline}
                        >Decline
                    </button>
                </div>
                ));