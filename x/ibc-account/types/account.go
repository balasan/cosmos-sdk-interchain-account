package types

import (
	"encoding/json"
	"fmt"

	"github.com/ghodss/yaml"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/tendermint/tendermint/crypto"
)

type IBCAccountI interface {
	authtypes.AccountI

	GetSourcePort() string
	GetSourceChannel() string
	GetDestinationPort() string
	GetDestinationChannel() string
}

var (
	_ IBCAccountI = (*IBCAccount)(nil)
)

func NewIBCAccount(ba *authtypes.BaseAccount, sourcePort, sourceChannel, destinationPort, destinationChannel string) *IBCAccount {
	return &IBCAccount{
		BaseAccount:        ba,
		SourcePort:         sourcePort,
		SourceChannel:      sourceChannel,
		DestinationPort:    destinationPort,
		DestinationChannel: destinationChannel,
	}
}

// SetPubKey - Implements AccountI
func (IBCAccount) SetPubKey(pubKey crypto.PubKey) error {
	return fmt.Errorf("not supported for ibc accounts")
}

// SetSequence - Implements AccountI
func (IBCAccount) SetSequence(seq uint64) error {
	return fmt.Errorf("not supported for ibc accounts")
}

func (ia IBCAccount) GetSourcePort() string {
	return ia.SourcePort
}

func (ia IBCAccount) GetSourceChannel() string {
	return ia.SourceChannel
}

func (ia IBCAccount) GetDestinationPort() string {
	return ia.DestinationPort
}

func (ia IBCAccount) GetDestinationChannel() string {
	return ia.DestinationChannel
}

type ibcAccountPretty struct {
	Address            sdk.AccAddress `json:"address" yaml:"address"`
	PubKey             string         `json:"public_key" yaml:"public_key"`
	AccountNumber      uint64         `json:"account_number" yaml:"account_number"`
	Sequence           uint64         `json:"sequence" yaml:"sequence"`
	SourcePort         string         `json:"source_port" yaml:"source_port"`
	SourceChannel      string         `json:"source_channel" yaml:"source_channel"`
	DestinationPort    string         `json:"destination_port" yaml:"destination_port"`
	DestinationChannel string         `json:"destination_channel" yaml:"destination_channel"`
}

func (ia IBCAccount) String() string {
	out, _ := ia.MarshalYAML()
	return out.(string)
}

// MarshalYAML returns the YAML representation of a IBCAccount.
func (ia IBCAccount) MarshalYAML() (interface{}, error) {
	bs, err := yaml.Marshal(ibcAccountPretty{
		Address:            ia.Address,
		PubKey:             "",
		AccountNumber:      ia.AccountNumber,
		Sequence:           ia.Sequence,
		SourcePort:         ia.SourcePort,
		SourceChannel:      ia.SourceChannel,
		DestinationPort:    ia.DestinationPort,
		DestinationChannel: ia.DestinationChannel,
	})

	if err != nil {
		return nil, err
	}

	return string(bs), nil
}

// MarshalJSON returns the JSON representation of a IBCAccount.
func (ia IBCAccount) MarshalJSON() ([]byte, error) {
	return json.Marshal(ibcAccountPretty{
		Address:            ia.Address,
		PubKey:             "",
		AccountNumber:      ia.AccountNumber,
		Sequence:           ia.Sequence,
		SourcePort:         ia.SourcePort,
		SourceChannel:      ia.SourceChannel,
		DestinationPort:    ia.DestinationPort,
		DestinationChannel: ia.DestinationChannel,
	})
}

// UnmarshalJSON unmarshals raw JSON bytes into a ModuleAccount.
func (ia *IBCAccount) UnmarshalJSON(bz []byte) error {
	var alias ibcAccountPretty
	if err := json.Unmarshal(bz, &alias); err != nil {
		return err
	}

	ia.BaseAccount = authtypes.NewBaseAccount(alias.Address, nil, alias.AccountNumber, alias.Sequence)
	ia.SourcePort = alias.SourcePort
	ia.SourceChannel = alias.SourceChannel
	ia.DestinationPort = alias.DestinationPort
	ia.DestinationChannel = alias.DestinationChannel

	return nil
}
